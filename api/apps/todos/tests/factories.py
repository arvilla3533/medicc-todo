import random

import factory
from django.utils import timezone
from factory.django import DjangoModelFactory

from ..models import Todo


class TodoFactory(DjangoModelFactory):
    class Meta:
        model = Todo

    name = factory.Faker("sentence", nb_words=4)
    description = factory.Faker("paragraph", nb_sentences=2)
    due_date = factory.LazyFunction(
        lambda: timezone.now() + timezone.timedelta(days=random.randint(1, 10))
    )
    completed_at = None
