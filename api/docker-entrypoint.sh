#!/bin/bash

db_ready() {
  python << EOF
import sys
from django.db import connection
from django.db.utils import OperationalError

try:
  connection.ensure_connection()
except OperationalError:
  sys.exit(1)

sys.exit(0)
EOF
}

trap "echo 'Exiting...'; exit;" SIGINT SIGTERM

until db_ready; do
    echo "DB is not ready... waiting."
    sleep 1
done

python manage.py collectstatic --no-input
python manage.py migrate --no-input

exec "$@"
