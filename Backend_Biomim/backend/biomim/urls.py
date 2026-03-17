from django.urls import path
from . import views

urlpatterns = [
#Les Api d'authentification
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('users/me/', views.me_view, name='me'),
    path('profile/update/', views.update_profile_view, name='update-profile'),
    path('api-key/generate/', views.generate_api_key_view, name='generate-api-key'),
    path('change-password/', views.change_password_view, name='change-password'),

#Les Api pour les plants
    path('plants/', views.plant_list_view, name='plant-list'),
    path('plants/featured/', views.featured_plants_view, name='plant-featured'),
    path('plants/endangered/', views.endangered_plants_view, name='plant-endangered'),
    path('plants/map/', views.plants_map_view, name='plant-map'),
    path('plants/stats/', views.stats_view, name='plant-stats'),
    path('plants/families/', views.plant_families_view, name='plant-families'),
    path('plants/regions/', views.regions_view, name='regions'),
    path('plants/<slug:slug>/', views.plant_detail_view, name='plant-detail'),
    path('plants/<int:plant_id>/comment/', views.add_comment_view, name='add-comment'),
    path('plants/chat/ask/', views.chatbot_view, name='chatbot'),

#Les Api pour les abonnements
    path('subscriptions/plans/', views.plans_view, name='plans'),
    path('subscriptions/my/', views.my_subscriptions_view, name='my-subscriptions'),
    path('subscriptions/initiate/', views.initiate_payment_view, name='initiate-payment'),
    path('paygate/callback/', views.paygate_callback_view, name='paygate-callback'),
    path('verify/<str:reference>/', views.verify_payment_view, name='verify-payment'),
    path('mock/confirm/', views.mock_payment_confirm_view, name='mock-confirm'),
]