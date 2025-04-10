import pytest

from apps.utilities.mixins import FactoryTestMixin, ModelTestMixin

from ..models import Todo
from .factories import TodoFactory


@pytest.mark.django_db
class TestTodo(FactoryTestMixin, ModelTestMixin):
    factory_class = TodoFactory
    model_class = Todo

    def test_all_fields(self):
        obj = self.get_factory_class().create()
        assert self.get_model_class().objects.filter(pk=obj.pk).exists()
