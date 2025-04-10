# MEDICC Todo App

## Installation

Use [poetry](https://python-poetry.org/docs/#installation) version >= 2.0 to install api dependencies

```bash
poetry install
```

Setup `.env` on `api` directory by copying contents from `env.example`

## Developing locally

Configure [postgres](https://www.postgresql.org/) local setup if developing locally. Make sure to make appropriate changes on the `.env` file

NOTE: remember to use a virtual environment

If commands fail, try running under `api` dir

```bash
poetry run python manage.py runserver
```

### Adding new apps

```bash
mkdir apps/<app_name>
poetry run python manage.py startapp <app_name> apps/<app_name>
```

### Running tests

See [pytest](https://docs.pytest.org/en/stable/) docs for more info on running specific tests

```bash
cd api
poetry run pytest
```

## Developing with docker

```
docker compose up --build
```

### Running tests

```bash
docker exec -it <api_container_name> pytest
```

### Frontend development

Setup `.env` on `apps/web` directory by copying contents from `env.example`

Install dependencies

```bash
cd apps/web
yarn install
```

Run on root dir for frontend server

```bash
yarn dev
```
