import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from apps.users.tests.factories import UserFactory

User = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user():
    return UserFactory.create(
        first_name="Test",
        last_name="User",
        email="test@user.com",
    )


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
