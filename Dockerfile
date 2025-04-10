# Build stage
FROM python:3.13 AS build

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=off

WORKDIR /app

# Install poetry
RUN pip install poetry==2.0.*

# Copy project files needed for dependency installation
COPY pyproject.toml .
COPY poetry.lock .

# Install app dependencies globally
RUN poetry config virtualenvs.create false \
  && poetry install --no-interaction \
  && poetry cache clear --no-interaction --all pypi

# Runner stage
FROM python:3.13-slim AS runner

# Copy runner dependencies from build stage
COPY --from=build /usr/local/lib/python3.13/site-packages /usr/local/lib/python3.13/site-packages
COPY --from=build /usr/local/bin /usr/local/bin

# Install runner dependencies
# curl is used by the health checker
# TODO: remove vim from production
RUN apt-get update && apt-get install -y --no-install-recommends \
  curl \
  vim \
  libpng-dev \
  libjpeg-dev \
  libfreetype6-dev \
  libpq-dev \
  libssl-dev \
  pkg-config \
  libmagic1 \
  postgresql-client \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY api/docker-entrypoint.sh /usr/bin/docker-entrypoint.sh
RUN chmod +x /usr/bin/docker-entrypoint.sh
ENTRYPOINT ["/usr/bin/docker-entrypoint.sh"]

WORKDIR /app

# Copy project files
COPY . .

EXPOSE 8000
CMD [\
  "gunicorn", \
  "--bind=0.0.0.0:8000", \
  "--workers=5", \
  "--worker-class=uvicorn.workers.UvicornWorker", \
  "--access-logfile=-", \
  "--error-logfile=-", \
  "--timeout=30", \
  "config.asgi:application"]
