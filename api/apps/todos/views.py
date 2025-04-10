from rest_framework import mixins, viewsets

from .models import Todo
from .serializers import TodoSerializer


class TodoViewSet(
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Todo.objects.all().order_by()
    serializer_class = TodoSerializer
