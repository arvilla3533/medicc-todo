from django.urls import path
from knox.views import LogoutView as KnoxLogoutView

from .views import CheckAuthenticationView, LoginView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", KnoxLogoutView.as_view(), name="logout"),
    path("check-auth/", CheckAuthenticationView.as_view(), name="check-auth"),
]
