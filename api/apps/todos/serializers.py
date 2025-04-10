from rest_framework import serializers

from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Todo
        fields = [
            "id",
            "name",
            "description",
            "due_date",
            "completed_at",
            "is_completed",
        ]

    def get_is_completed(self, obj):
        return obj.completed_at is not None
