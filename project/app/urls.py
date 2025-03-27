from django.urls import path
from .views import *

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('home/', home, name='home'),
    path("forgot-password/", forgot_password, name="forgot_password"),
    path('profile/', get_user_profile, name='profile'), 
    path('logout/', logout_user, name='logout'),
]
