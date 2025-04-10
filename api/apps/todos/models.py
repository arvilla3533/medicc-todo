from django.db import models
from model_utils.models import TimeStampedModel


class Todo(TimeStampedModel):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    due_date = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    @property
    def is_completed(self):
        return self.completed_at is not None