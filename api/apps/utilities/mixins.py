from django.urls import reverse


class FactoryTestMixin:
    def get_factory_class(self):
        return self.factory_class


class ModelTestMixin:
    def get_model_class(self):
        return self.model_class


class ViewSetTestMixin:
    def get_url(self):
        return reverse(self.url_namespace)


class ModelViewSetTestMixin:
    url_namespace: str

    def get_view_name(self, view_name):
        return f"{self.url_namespace}-{view_name}"
