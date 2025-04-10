import pytest
from django.urls import reverse

from apps.users.tests.factories import UserFactory
from apps.utilities.mixins import ViewSetTestMixin


@pytest.mark.django_db
class TestLogin(ViewSetTestMixin):
    url_namespace = "login"

    def test_login(self, api_client, created_user_credentials):
        username, password = created_user_credentials
        data = {"email": username, "password": password}
        response = api_client.post(self.get_url(), data=data)

        assert response.status_code == 200
        assert "token" in response.data


@pytest.mark.django_db
class TestLogout(ViewSetTestMixin):
    url_namespace = "logout"

    def test_logout(self, api_client, created_user_credentials):
        username, password = created_user_credentials
        data = {"email": username, "password": password}
        login_response = api_client.post(reverse("login"), data=data)

        api_client.credentials(
            HTTP_AUTHORIZATION=f"Token {login_response.data.get('token')}"
        )
        response = api_client.post(self.get_url())

        assert response.status_code == 204


@pytest.mark.django_db
class TestCheckAuth(ViewSetTestMixin):
    url_namespace = "check-auth"

    def test_loggedin_user(self, api_client):
        user = UserFactory.create()
        api_client.force_authenticate(user)

        response = api_client.get(self.get_url())

        assert response.status_code == 200

    def test_nonloggedin_user(self, api_client):
        response = api_client.get(self.get_url())

        assert response.status_code == 401
