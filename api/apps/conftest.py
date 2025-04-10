import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def created_user_credentials():
    email = "user@mail.com"
    password = "sflkfja123!"
    User.objects.create_user(
        username=email,
        email=email,
        password=password,
    )

    return email, password
