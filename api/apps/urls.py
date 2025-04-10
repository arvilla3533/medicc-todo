from django.urls import include, path

urlpatterns = [
    path("todos/", include("apps.todos.urls")),
]
