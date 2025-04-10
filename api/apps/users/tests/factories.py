from django.contrib.auth.hashers import make_password
from factory import Faker, Sequence
from factory.django import DjangoModelFactory

from ..models import User


class UserFactory(DjangoModelFactory[User]):
    username = Sequence(lambda n: f"user_{n}")
    email = Faker("email")
    password = make_password("password")
    first_name = Faker("first_name")
    last_name = Faker("last_name")

    class Meta:
        model = User
