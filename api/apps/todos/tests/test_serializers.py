import pytest
from django.utils.dateparse import parse_datetime

from ..serializers import TodoSerializer
from .factories import TodoFactory


@pytest.mark.django_db
class TestTodoSerializer:
    def test_serializer(self):
        obj = TodoFactory.create()
        serializer = TodoSerializer(obj)

        assert serializer.data["name"] == obj.name
        assert serializer.data["description"] == obj.description
        response_due_date = parse_datetime(serializer.data["due_date"])
        assert response_due_date == obj.due_date
        assert serializer.data["completed_at"] == obj.completed_at
