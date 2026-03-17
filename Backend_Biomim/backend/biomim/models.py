from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
from django.conf import settings 

class User(AbstractUser):
    PLAN_FREE = 'free'
    PLAN_PREMIUM = 'premium'
    PLAN_PRO = 'pro'

    PLAN_CHOICES = [
        (PLAN_FREE, 'Gratuit'),
        (PLAN_PREMIUM, 'Premium'),
        (PLAN_PRO, 'Professionnel'),
    ]

    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    organisation = models.CharField(max_length=200, blank=True)
    profession = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    plan = models.CharField(max_length=20, choices=PLAN_CHOICES, default=PLAN_FREE)
    plan_expires_at = models.DateTimeField(null=True, blank=True)
    api_key = models.CharField(max_length=64, unique=True, blank=True, null=True)
    api_calls_count = models.IntegerField(default=0)
    api_calls_limit = models.IntegerField(default=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = 'Utilisateur'
        verbose_name_plural = 'Utilisateurs'
        db_table = 'biomim_user'

    def __str__(self):
        return self.email

    @property
    def is_premium(self):
        from django.utils import timezone
        if self.plan in [self.PLAN_PREMIUM, self.PLAN_PRO]:
            if self.plan_expires_at and self.plan_expires_at > timezone.now():
                return True
        return False

    def generate_api_key(self):
        import secrets
        self.api_key = secrets.token_hex(32)
        self.save()
        return self.api_key




class PlantFamily(models.Model):
    name = models.CharField(max_length=200)
    scientific_name = models.CharField(max_length=200, blank=True)

    class Meta:
        verbose_name = 'Famille botanique'
        verbose_name_plural = 'Familles botaniques'
        ordering = ['name']

    def __str__(self):
        return self.name


class Region(models.Model):
    name = models.CharField(max_length=200)
    country = models.CharField(max_length=100, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    class Meta:
        verbose_name = 'Région'
        verbose_name_plural = 'Régions'
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.country})" if self.country else self.name


class Plant(models.Model):
    STATUS_COMMON = 'common'
    STATUS_RARE = 'rare'
    STATUS_VULNERABLE = 'vulnerable'
    STATUS_ENDANGERED = 'endangered'
    STATUS_CRITICAL = 'critical'

    STATUS_CHOICES = [
        (STATUS_COMMON, 'Commune'),
        (STATUS_RARE, 'Rare'),
        (STATUS_VULNERABLE, 'Vulnérable'),
        (STATUS_ENDANGERED, 'En danger'),
        (STATUS_CRITICAL, 'Critique'),
    ]

    # Identité
    name = models.CharField(max_length=300, verbose_name='Nom commun')
    scientific_name = models.CharField(max_length=300, verbose_name='Nom scientifique')
    local_names = models.JSONField(default=list, blank=True, verbose_name='Noms locaux')
    slug = models.SlugField(max_length=350, unique=True, blank=True)
    family = models.ForeignKey(PlantFamily, on_delete=models.SET_NULL, null=True, blank=True, related_name='plants')

    # Description
    description = models.TextField(verbose_name='Description générale')
    morphology = models.TextField(blank=True, verbose_name='Morphologie')
    habitat = models.TextField(blank=True, verbose_name='Habitat')
    
    # Données botaniques
    regions = models.ManyToManyField(Region, blank=True, verbose_name='Régions')
    conservation_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_COMMON)
    
    # Propriétés thérapeutiques
    traditional_uses = models.TextField(blank=True, verbose_name='Usages traditionnels')
    therapeutic_properties = models.JSONField(default=list, blank=True, verbose_name='Propriétés thérapeutiques')
    active_compounds = models.JSONField(default=list, blank=True, verbose_name='Composés actifs')
    pharmacological_activities = models.JSONField(default=list, blank=True, verbose_name='Activités pharmacologiques')
    contraindications = models.TextField(blank=True, verbose_name='Contre-indications')
    
    # Données chimiques
    chemical_formula = models.CharField(max_length=200, blank=True)
    molecular_weight = models.FloatField(null=True, blank=True)
    
    # Sources
    sources = models.JSONField(default=list, blank=True, verbose_name='Sources bibliographiques')
    gbif_id = models.CharField(max_length=50, blank=True)
    plantnet_id = models.CharField(max_length=50, blank=True)
    
    # Médias
    image = models.ImageField(upload_to='plants/', blank=True, null=True)
    image_url = models.URLField(blank=True)

    # Accès
    is_premium = models.BooleanField(default=False, verbose_name='Contenu premium')
    is_verified = models.BooleanField(default=False, verbose_name='Vérifié')
    is_published = models.BooleanField(default=True, verbose_name='Publié')
    
    # Stats
    views_count = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Plante'
        verbose_name_plural = 'Plantes'
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.scientific_name})"

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.scientific_name or self.name)
            slug = base_slug
            n = 1
            while Plant.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{n}"
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def to_dict(self, detailed=False):
        data = {
            'id': self.id,
            'name': self.name,
            'scientific_name': self.scientific_name,
            'local_names': self.local_names,
            'slug': self.slug,
            'family': self.family.name if self.family else None,
            'description': self.description,
            'conservation_status': self.conservation_status,
            'conservation_status_display': self.get_conservation_status_display(),
            'therapeutic_properties': self.therapeutic_properties,
            'active_compounds': self.active_compounds,
            'is_premium': self.is_premium,
            'is_verified': self.is_verified,
            'image': self.image.url if self.image else self.image_url or None,
            'regions': [{'id': r.id, 'name': r.name, 'country': r.country} for r in self.regions.all()],
            'views_count': self.views_count,
        }
        if detailed:
            data.update({
                'morphology': self.morphology,
                'habitat': self.habitat,
                'traditional_uses': self.traditional_uses,
                'pharmacological_activities': self.pharmacological_activities,
                'contraindications': self.contraindications,
                'chemical_formula': self.chemical_formula,
                'molecular_weight': self.molecular_weight,
                'sources': self.sources,
            })
        return data


class PlantComment(models.Model):
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    content = models.TextField()
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.get_full_name() or self.user.username,
            'content': self.content,
            'created_at': self.created_at.isoformat(),
        }


class ChatMessage(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, null=True, blank=True)
    session_key = models.CharField(max_length=40, blank=True)
    role = models.CharField(max_length=20)  
    content = models.TextField()
    plant_refs = models.ManyToManyField(Plant, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']


from django.utils import timezone
from datetime import timedelta


class SubscriptionPlan(models.Model):
    PLAN_FREE = 'free'
    PLAN_PREMIUM = 'premium'
    PLAN_PRO = 'pro'

    PLAN_CHOICES = [
        (PLAN_FREE, 'Gratuit'),
        (PLAN_PREMIUM, 'Premium'),
        (PLAN_PRO, 'Professionnel'),
    ]

    BILLING_MONTHLY = 'monthly'
    BILLING_YEARLY = 'yearly'

    BILLING_CHOICES = [
        (BILLING_MONTHLY, 'Mensuel'),
        (BILLING_YEARLY, 'Annuel'),
    ]

    name = models.CharField(max_length=100)
    plan_type = models.CharField(max_length=20, choices=PLAN_CHOICES)
    billing_cycle = models.CharField(max_length=20, choices=BILLING_CHOICES, default=BILLING_MONTHLY)
    price_fcfa = models.IntegerField(default=0)
    description = models.TextField(blank=True)
    features = models.JSONField(default=list)
    api_calls_limit = models.IntegerField(default=100)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Plan d\'abonnement'
        verbose_name_plural = 'Plans d\'abonnement'

    def __str__(self):
        return f"{self.name} - {self.price_fcfa} FCFA/{self.billing_cycle}"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'plan_type': self.plan_type,
            'billing_cycle': self.billing_cycle,
            'price_fcfa': self.price_fcfa,
            'description': self.description,
            'features': self.features,
            'api_calls_limit': self.api_calls_limit,
        }


class Subscription(models.Model):
    STATUS_PENDING = 'pending'
    STATUS_ACTIVE = 'active'
    STATUS_EXPIRED = 'expired'
    STATUS_CANCELLED = 'cancelled'
    STATUS_FAILED = 'failed'

    STATUS_CHOICES = [
        (STATUS_PENDING, 'En attente'),
        (STATUS_ACTIVE, 'Actif'),
        (STATUS_EXPIRED, 'Expiré'),
        (STATUS_CANCELLED, 'Annulé'),
        (STATUS_FAILED, 'Échoué'),
    ]

    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='subscriptions')
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_PENDING)
    
    # PayGate fields
    paygate_transaction_id = models.CharField(max_length=200, blank=True)
    paygate_reference = models.CharField(max_length=200, blank=True, unique=True)
    payment_method = models.CharField(max_length=50, blank=True)  # moov, mtn, etc.
    
    amount_paid = models.IntegerField(default=0)
    currency = models.CharField(max_length=10, default='XOF')
    
    starts_at = models.DateTimeField(null=True, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Abonnement'
        verbose_name_plural = 'Abonnements'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.email} - {self.plan} - {self.status}"

    def activate(self):
        self.status = self.STATUS_ACTIVE
        self.starts_at = timezone.now()
        if self.plan:
            if self.plan.billing_cycle == 'monthly':
                self.expires_at = timezone.now() + timedelta(days=30)
            else:
                self.expires_at = timezone.now() + timedelta(days=365)
        self.save()

        # Update user plan
        user = self.user
        user.plan = self.plan.plan_type if self.plan else 'free'
        user.plan_expires_at = self.expires_at
        if self.plan:
            user.api_calls_limit = self.plan.api_calls_limit
        user.save()

    def to_dict(self):
        return {
            'id': self.id,
            'plan': self.plan.to_dict() if self.plan else None,
            'status': self.status,
            'amount_paid': self.amount_paid,
            'currency': self.currency,
            'starts_at': self.starts_at.isoformat() if self.starts_at else None,
            'expires_at': self.expires_at.isoformat() if self.expires_at else None,
            'created_at': self.created_at.isoformat(),
            'paygate_reference': self.paygate_reference,
        }