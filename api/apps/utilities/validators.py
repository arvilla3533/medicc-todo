from django.conf import settings
from django.core import exceptions
from django.utils.translation import gettext_lazy as _


def validate_file_size(file):
    limit_in_bytes = settings.MAX_FILE_UPLOAD_SIZE_MB * 1024 * 1024

    if file.size > limit_in_bytes:
        raise exceptions.ValidationError(
            _(f"File size must be at most {settings.MAX_FILE_UPLOAD_SIZE_MB}mb")
        )
