import datetime

import pytest
from django.urls import reverse
from django.utils.dateparse import parse_datetime
from rest_framework import status

from apps.utilities.mixins import FactoryTestMixin, ModelViewSetTestMixin

from .factories import TodoFactory


@pytest.mark.django_db
class TestTodoViewSet(FactoryTestMixin, ModelViewSetTestMixin):
    url_namespace = "todos"
    factory_class = TodoFactory

    def test_create(self, api_client, user):
        api_client.force_authenticate(user)

        data = {
            "name": "Todo 1",
            "description": "Todo description",
            "due_date": datetime.datetime(2025, 12, 12, tzinfo=datetime.timezone.utc),
            "completed_at": None,
        }
        url = reverse(self.get_view_name("list"))
        response = api_client.post(url, data=data, format="json")

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["name"] == data["name"]
        assert response.data["description"] == data["description"]
        assert parse_datetime(response.data["due_date"]) == data["due_date"]
        assert response.data["completed_at"] == data["completed_at"]

    def test_destroy(self, api_client, user):
        api_client.force_authenticate(user)
        obj = self.get_factory_class().create()

        url = reverse(self.get_view_name("detail"), kwargs={"pk": obj.id})
        response = api_client.delete(url, format="json")

        assert response.status_code == status.HTTP_204_NO_CONTENT

    def test_list(self, api_client, user):
        api_client.force_authenticate(user)
        self.get_factory_class().create()

        url = reverse(self.get_view_name("list"))
        response = api_client.get(url, format="json")

        assert response.data["count"] == 1

    def test_retrieve(self, api_client, user):
        obj = self.get_factory_class().create()

        url = reverse(self.get_view_name("detail"), kwargs={"pk": obj.id})
        response = api_client.get(url, format="json")

        assert response.data["name"] == obj.name
        assert response.data["description"] == obj.description
        response_due_date = parse_datetime(response.data["due_date"])
        assert response_due_date == obj.due_date
        assert response.data["completed_at"] == obj.completed_at

    def test_update(self, api_client, user):
        obj = self.get_factory_class().create()
        updated_data = {
            "name": "Updated Name",
            "description": "Updated Description",
        }

        assert obj.name != updated_data["name"]
        assert obj.description != updated_data["description"]

        url = reverse(self.get_view_name("detail"), kwargs={"pk": obj.id})
        response = api_client.patch(url, updated_data, format="json")

        obj.refresh_from_db()
        assert response.status_code == status.HTTP_200_OK
        assert obj.name == updated_data["name"]
        assert obj.description == updated_data["description"]
