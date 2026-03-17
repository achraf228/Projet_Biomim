from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

# Create your views here.
import json
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.utils import timezone

User = get_user_model()


def user_to_dict(user):
    return {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'bio': user.bio,
        'organisation': user.organisation,
        'profession': user.profession,
        'phone': user.phone,
        'plan': user.plan,
        'plan_expires_at': user.plan_expires_at.isoformat() if user.plan_expires_at else None,
        'is_premium': user.is_premium,
        'api_calls_count': user.api_calls_count,
        'api_calls_limit': user.api_calls_limit,
        'avatar': user.avatar.url if user.avatar else None,
        'date_joined': user.date_joined.isoformat(),
    }


@csrf_exempt
@require_http_methods(["POST"])
def register_view(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Données invalides'}, status=400)

    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    first_name = data.get('first_name', '').strip()
    last_name = data.get('last_name', '').strip()
    username = data.get('username', email.split('@')[0])

    if not email or not password:
        return JsonResponse({'error': 'Email et mot de passe requis'}, status=400)

    if len(password) < 8:
        return JsonResponse({'error': 'Le mot de passe doit contenir au moins 8 caractères'}, status=400)

    if User.objects.filter(email=email).exists():
        return JsonResponse({'error': 'Un compte avec cet email existe déjà'}, status=400)

    if User.objects.filter(username=username).exists():
        username = email.split('@')[0] + '_' + str(User.objects.count())

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name,
    )
    login(request, user)
    return JsonResponse({'message': 'Compte créé avec succès', 'user': user_to_dict(user)}, status=201)


@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Données invalides'}, status=400)

    email = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not email or not password:
        return JsonResponse({'error': 'Email et mot de passe requis'}, status=400)

    user = authenticate(request, username=email, password=password)
    if user is None:
        # Try with username
        try:
            u = User.objects.get(email=email)
            user = authenticate(request, username=u.username, password=password)
        except User.DoesNotExist:
            pass

    if user is None:
        return JsonResponse({'error': 'Email ou mot de passe incorrect'}, status=401)

    if not user.is_active:
        return JsonResponse({'error': 'Compte désactivé'}, status=403)

    login(request, user)
    return JsonResponse({'message': 'Connexion réussie', 'user': user_to_dict(user)})


@require_http_methods(["POST"])
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Déconnexion réussie'})


@require_http_methods(["GET"])
def me_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Non authentifié'}, status=401)
    return JsonResponse({'user': user_to_dict(request.user)})


@csrf_exempt
@login_required
@require_http_methods(["PATCH", "PUT"])
def update_profile_view(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Données invalides'}, status=400)

    user = request.user
    updatable_fields = ['first_name', 'last_name', 'bio', 'organisation', 'profession', 'phone']

    for field in updatable_fields:
        if field in data:
            setattr(user, field, data[field])

    user.save()
    return JsonResponse({'message': 'Profil mis à jour', 'user': user_to_dict(user)})


@login_required
@require_http_methods(["GET"])
def generate_api_key_view(request):
    api_key = request.user.generate_api_key()
    return JsonResponse({'api_key': api_key})


@csrf_exempt
@login_required
@require_http_methods(["POST"])
def change_password_view(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Données invalides'}, status=400)

    old_password = data.get('old_password', '')
    new_password = data.get('new_password', '')

    if not request.user.check_password(old_password):
        return JsonResponse({'error': 'Ancien mot de passe incorrect'}, status=400)

    if len(new_password) < 8:
        return JsonResponse({'error': 'Le nouveau mot de passe doit contenir au moins 8 caractères'}, status=400)

    request.user.set_password(new_password)
    request.user.save()
    return JsonResponse({'message': 'Mot de passe modifié avec succès'})



import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db.models import Q
from django.conf import settings
from .models import Plant, PlantFamily, Region, PlantComment, ChatMessage


# ──────────────────────────────────────────
# PLANTS LIST & SEARCH
# ──────────────────────────────────────────

@require_http_methods(["GET"])
def plant_list_view(request):
    """List plants with search and filters"""
    qs = Plant.objects.filter(is_published=True).prefetch_related('regions').select_related('family')

    search = request.GET.get('q', '').strip()
    if search:
        qs = qs.filter(
            Q(name__icontains=search) |
            Q(scientific_name__icontains=search) |
            Q(description__icontains=search) |
            Q(traditional_uses__icontains=search)
        )

    family_id = request.GET.get('family')
    if family_id:
        qs = qs.filter(family_id=family_id)

    region_id = request.GET.get('region')
    if region_id:
        qs = qs.filter(regions__id=region_id)

    status = request.GET.get('status')
    if status:
        qs = qs.filter(conservation_status=status)

    prop = request.GET.get('property')
    if prop:
        qs = qs.filter(therapeutic_properties__icontains=prop)

    premium_only = request.GET.get('premium')
    if premium_only == 'true':
        qs = qs.filter(is_premium=True)
    elif premium_only == 'false':
        qs = qs.filter(is_premium=False)

    page_num = int(request.GET.get('page', 1))
    page_size = int(request.GET.get('page_size', 12))
    paginator = Paginator(qs, page_size)
    page = paginator.get_page(page_num)

    # For non-premium users, hide details on premium plants
    is_premium_user = request.user.is_authenticated and request.user.is_premium

    plants_data = []
    for plant in page.object_list:
        d = plant.to_dict(detailed=False)
        if plant.is_premium and not is_premium_user:
            d['locked'] = True
        plants_data.append(d)

    return JsonResponse({
        'results': plants_data,
        'count': paginator.count,
        'total_pages': paginator.num_pages,
        'current_page': page_num,
        'has_next': page.has_next(),
        'has_previous': page.has_previous(),
    })


@require_http_methods(["GET"])
def plant_detail_view(request, slug):
    """Get plant detail by slug"""
    try:
        plant = Plant.objects.prefetch_related('regions', 'comments').select_related('family').get(slug=slug, is_published=True)
    except Plant.DoesNotExist:
        return JsonResponse({'error': 'Plante introuvable'}, status=404)

    # Increment view count
    Plant.objects.filter(pk=plant.pk).update(views_count=plant.views_count + 1)

    is_premium_user = request.user.is_authenticated and request.user.is_premium

    if plant.is_premium and not is_premium_user:
        # Return partial data
        data = plant.to_dict(detailed=False)
        data['locked'] = True
        data['lock_message'] = 'Abonnement Premium requis pour accéder à la fiche complète'
        return JsonResponse({'plant': data})

    data = plant.to_dict(detailed=True)
    data['comments'] = [c.to_dict() for c in plant.comments.filter(is_approved=True)]
    return JsonResponse({'plant': data})


@require_http_methods(["GET"])
def plant_families_view(request):
    families = PlantFamily.objects.all().values('id', 'name', 'scientific_name')
    return JsonResponse({'families': list(families)})


@require_http_methods(["GET"])
def regions_view(request):
    regions = Region.objects.all().values('id', 'name', 'country', 'latitude', 'longitude')
    return JsonResponse({'regions': list(regions)})


@require_http_methods(["GET"])
def plants_map_view(request):
    """Return plants with geolocation data for map"""
    plants = Plant.objects.filter(is_published=True).prefetch_related('regions')
    map_data = []
    for plant in plants:
        for region in plant.regions.all():
            if region.latitude and region.longitude:
                map_data.append({
                    'plant_id': plant.id,
                    'plant_name': plant.name,
                    'plant_slug': plant.slug,
                    'scientific_name': plant.scientific_name,
                    'conservation_status': plant.conservation_status,
                    'region': region.name,
                    'country': region.country,
                    'lat': region.latitude,
                    'lng': region.longitude,
                })
    return JsonResponse({'points': map_data})


@require_http_methods(["GET"])
def endangered_plants_view(request):
    """Return list of threatened plants"""
    threatened = Plant.objects.filter(
        conservation_status__in=['vulnerable', 'endangered', 'critical'],
        is_published=True
    ).select_related('family')
    return JsonResponse({'plants': [p.to_dict() for p in threatened]})


@require_http_methods(["GET"])
def featured_plants_view(request):
    """Return featured / latest plants for homepage"""
    plants = Plant.objects.filter(is_published=True, is_verified=True).order_by('-views_count')[:8]
    return JsonResponse({'plants': [p.to_dict() for p in plants]})


@require_http_methods(["GET"])
def stats_view(request):
    """Public stats for homepage"""
    return JsonResponse({
        'total_plants': Plant.objects.filter(is_published=True).count(),
        'total_families': PlantFamily.objects.count(),
        'total_regions': Region.objects.count(),
        'endangered_count': Plant.objects.filter(
            conservation_status__in=['endangered', 'critical'],
            is_published=True
        ).count(),
        'verified_count': Plant.objects.filter(is_published=True, is_verified=True).count(),
    })


# ──────────────────────────────────────────
# COMMENTS
# ──────────────────────────────────────────

@csrf_exempt
@login_required
@require_http_methods(["POST"])
def add_comment_view(request, plant_id):
    try:
        plant = Plant.objects.get(pk=plant_id, is_published=True)
    except Plant.DoesNotExist:
        return JsonResponse({'error': 'Plante introuvable'}, status=404)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Données invalides'}, status=400)

    content = data.get('content', '').strip()
    if not content:
        return JsonResponse({'error': 'Commentaire vide'}, status=400)

    comment = PlantComment.objects.create(plant=plant, user=request.user, content=content)
    return JsonResponse({'message': 'Commentaire soumis, en attente de modération', 'comment_id': comment.id}, status=201)


# ──────────────────────────────────────────
# AI CHATBOT
# ──────────────────────────────────────────

@csrf_exempt
@require_http_methods(["POST"])
def chatbot_view(request):
    """AI chatbot using RAG with plant database"""
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Données invalides'}, status=400)

    question = data.get('message', '').strip()
    if not question:
        return JsonResponse({'error': 'Message vide'}, status=400)

    # Check API limits for non-authenticated users
    if not request.user.is_authenticated:
        # Use session to track usage
        session_count = request.session.get('chat_count', 0)
        if session_count >= 5:
            return JsonResponse({
                'error': 'Limite atteinte',
                'message': 'Créez un compte gratuit pour continuer à utiliser l\'assistant BioMim.',
                'requires_auth': True
            }, status=429)
        request.session['chat_count'] = session_count + 1

    # RAG: Retrieve relevant plants from database
    relevant_plants = _retrieve_relevant_plants(question)
    context = _build_context(relevant_plants)

    # Generate response
    response = _generate_ai_response(question, context)

    # Save chat history
    session_key = request.session.session_key or ''
    user = request.user if request.user.is_authenticated else None
    ChatMessage.objects.create(role='user', content=question, user=user, session_key=session_key)
    msg = ChatMessage.objects.create(role='assistant', content=response, user=user, session_key=session_key)
    if relevant_plants:
        msg.plant_refs.set(relevant_plants)

    return JsonResponse({
        'response': response,
        'referenced_plants': [{'id': p.id, 'name': p.name, 'slug': p.slug} for p in relevant_plants],
    })


def _retrieve_relevant_plants(question):
    """Simple keyword-based RAG retrieval"""
    words = [w for w in question.lower().split() if len(w) > 3]
    if not words:
        return []

    q = Q()
    for word in words[:5]:
        q |= Q(name__icontains=word)
        q |= Q(scientific_name__icontains=word)
        q |= Q(traditional_uses__icontains=word)
        q |= Q(description__icontains=word)

    return list(Plant.objects.filter(q, is_published=True)[:5])


def _build_context(plants):
    if not plants:
        return "Aucune plante spécifique trouvée dans la base de données BioMim pour cette question."
    parts = []
    for p in plants:
        parts.append(
            f"Plante: {p.name} ({p.scientific_name})\n"
            f"Description: {p.description[:300]}\n"
            f"Propriétés: {', '.join(p.therapeutic_properties) if p.therapeutic_properties else 'Non renseignées'}\n"
            f"Usages traditionnels: {p.traditional_uses[:200] if p.traditional_uses else 'Non renseignés'}\n"
        )
    return "\n---\n".join(parts)


def _generate_ai_response(question, context):
    """Generate AI response using Groq or OpenAI"""
    system_prompt = """Tu es BioMim Assistant, un expert en plantes médicinales africaines. 
    Tu réponds aux questions scientifiques sur les plantes médicinales d'Afrique de l'Ouest et du continent.
    Base tes réponses sur les données fournies. Sois précis, scientifique mais accessible.
    Si tu n'as pas d'information sur une plante spécifique, dis-le clairement.
    Réponds toujours en français."""

    # Try Groq first (faster and cheaper)
    groq_key = settings.GROQ_API_KEY
    if groq_key:
        try:
            import urllib.request
            payload = json.dumps({
                "model": "llama3-8b-8192",
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"Contexte BioMim:\n{context}\n\nQuestion: {question}"}
                ],
                "max_tokens": 500,
                "temperature": 0.7
            }).encode()
            req = urllib.request.Request(
                "https://api.groq.com/openai/v1/chat/completions",
                data=payload,
                headers={"Authorization": f"Bearer {groq_key}", "Content-Type": "application/json"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                result = json.loads(resp.read())
                return result['choices'][0]['message']['content']
        except Exception:
            pass

    # Fallback: rule-based response
    return _fallback_response(question, context)


def _fallback_response(question, context):
    """Fallback when no AI API is available"""
    if "propriétés" in question.lower() or "thérapeutique" in question.lower():
        return (f"D'après la base de données BioMim:\n\n{context[:500]}\n\n"
                "Pour des informations plus détaillées, consultez les fiches complètes sur la plateforme.")
    return (f"Voici ce que BioMim sait sur votre question:\n\n{context[:500]}\n\n")


import json
import hmac
import hashlib
import uuid
import urllib.request
import urllib.parse
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.conf import settings
from .models import SubscriptionPlan, Subscription


# ──────────────────────────────────────────
# PLANS
# ──────────────────────────────────────────

@require_http_methods(["GET"])
def plans_view(request):
    """List all subscription plans"""
    plans = SubscriptionPlan.objects.filter(is_active=True)
    return JsonResponse({'plans': [p.to_dict() for p in plans]})


# ──────────────────────────────────────────
# USER SUBSCRIPTIONS
# ──────────────────────────────────────────

@login_required
@require_http_methods(["GET"])
def my_subscriptions_view(request):
    """Get user's subscription history"""
    subs = Subscription.objects.filter(user=request.user).select_related('plan')
    return JsonResponse({'subscriptions': [s.to_dict() for s in subs]})


# ──────────────────────────────────────────
# PAYGATE GLOBAL INTEGRATION
# ──────────────────────────────────────────

@csrf_exempt
@login_required
@require_http_methods(["POST"])
def initiate_payment_view(request):
    """Initiate a PayGate Global payment"""
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Données invalides'}, status=400)

    plan_id = data.get('plan_id')
    payment_method = data.get('payment_method', 'mobile_money')  # mobile_money, card
    phone = data.get('phone', '')

    try:
        plan = SubscriptionPlan.objects.get(pk=plan_id, is_active=True)
    except SubscriptionPlan.DoesNotExist:
        return JsonResponse({'error': 'Plan introuvable'}, status=404)

    if plan.price_fcfa == 0:
        return JsonResponse({'error': 'Ce plan est gratuit'}, status=400)

    # Generate unique reference
    reference = f"BIOMIM-{uuid.uuid4().hex[:12].upper()}"

    # Create pending subscription
    subscription = Subscription.objects.create(
        user=request.user,
        plan=plan,
        paygate_reference=reference,
        payment_method=payment_method,
        amount_paid=plan.price_fcfa,
        currency='XOF',
    )

    # PayGate Global API call
    paygate_payload = {
        "merchant_id": settings.PAYGATE_MERCHANT_ID,
        "reference": reference,
        "amount": plan.price_fcfa,
        "currency": "XOF",
        "description": f"BioMim {plan.name} - {plan.billing_cycle}",
        "customer": {
            "name": request.user.get_full_name() or request.user.username,
            "email": request.user.email,
            "phone": phone or request.user.phone,
        },
        "payment_method": payment_method,
        "callback_url": settings.PAYGATE_CALLBACK_URL,
        "return_url": f"{data.get('return_url', 'http://localhost:5173/dashboard?subscription=success')}",
        "cancel_url": f"{data.get('cancel_url', 'http://localhost:5173/pricing?cancelled=true')}",
        "metadata": {
            "user_id": str(request.user.id),
            "plan_id": str(plan.id),
            "subscription_id": str(subscription.id),
        }
    }

    try:
        payload_bytes = json.dumps(paygate_payload).encode()
        req = urllib.request.Request(
            f"{settings.PAYGATE_BASE_URL}/payments/initiate",
            data=payload_bytes,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {settings.PAYGATE_API_KEY}",
                "X-Merchant-ID": settings.PAYGATE_MERCHANT_ID,
            },
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=30) as resp:
            paygate_response = json.loads(resp.read())

        payment_url = paygate_response.get('payment_url') or paygate_response.get('redirect_url', '')
        transaction_id = paygate_response.get('transaction_id', '')

        subscription.paygate_transaction_id = transaction_id
        subscription.save()

        return JsonResponse({
            'payment_url': payment_url,
            'reference': reference,
            'transaction_id': transaction_id,
            'subscription_id': subscription.id,
        })

    except Exception as e:
        # In development, simulate success
        if settings.DEBUG:
            return JsonResponse({
                'payment_url': f"http://localhost:5173/payment/mock?ref={reference}&amount={plan.price_fcfa}",
                'reference': reference,
                'subscription_id': subscription.id,
                'debug': True,
                'note': 'Mode développement: configurez PAYGATE_API_KEY pour la production',
            })
        subscription.delete()
        return JsonResponse({'error': f'Erreur de paiement: {str(e)}'}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def paygate_callback_view(request):
    """Handle PayGate Global webhook callback"""
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return HttpResponse('Invalid JSON', status=400)

    # Verify signature if provided
    signature = request.headers.get('X-PayGate-Signature', '')
    if signature and settings.PAYGATE_API_KEY:
        expected = hmac.new(
            settings.PAYGATE_API_KEY.encode(),
            request.body,
            hashlib.sha256
        ).hexdigest()
        if not hmac.compare_digest(signature, expected):
            return HttpResponse('Invalid signature', status=401)

    reference = data.get('reference', '')
    status = data.get('status', '')
    transaction_id = data.get('transaction_id', '')

    try:
        subscription = Subscription.objects.get(paygate_reference=reference)
    except Subscription.DoesNotExist:
        return HttpResponse('Subscription not found', status=404)

    if status in ['success', 'completed', 'paid']:
        subscription.paygate_transaction_id = transaction_id
        subscription.activate()
    elif status in ['failed', 'cancelled']:
        subscription.status = Subscription.STATUS_FAILED if status == 'failed' else Subscription.STATUS_CANCELLED
        subscription.save()

    return HttpResponse('OK', status=200)


@login_required
@require_http_methods(["GET"])
def verify_payment_view(request, reference):
    """Verify payment status (polling from frontend)"""
    try:
        subscription = Subscription.objects.get(
            paygate_reference=reference,
            user=request.user
        )
    except Subscription.DoesNotExist:
        return JsonResponse({'error': 'Paiement introuvable'}, status=404)

    return JsonResponse({
        'status': subscription.status,
        'subscription': subscription.to_dict(),
    })


# ──────────────────────────────────────────
# MOCK PAYMENT (Dev only)
# ──────────────────────────────────────────

@csrf_exempt
@require_http_methods(["POST"])
def mock_payment_confirm_view(request):
    """Simulate payment confirmation in dev mode"""
    if not settings.DEBUG:
        return JsonResponse({'error': 'Non disponible en production'}, status=403)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Données invalides'}, status=400)

    reference = data.get('reference', '')
    try:
        subscription = Subscription.objects.get(paygate_reference=reference)
        subscription.activate()
        return JsonResponse({'message': 'Paiement simulé avec succès', 'subscription': subscription.to_dict()})
    except Subscription.DoesNotExist:
        return JsonResponse({'error': 'Abonnement introuvable'}, status=404)