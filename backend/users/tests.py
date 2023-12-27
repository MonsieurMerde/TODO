from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate
from users.models import User
from users.views import UserModelViewSet


class UsersTestCase(TestCase):
    def setUp(self):
        factory = APIRequestFactory()
        self.request = factory.get("/api/users/")
        self.view = UserModelViewSet.as_view({"get": "list"})
        self.test_admin = User.objects.create_superuser(
            username="test_admin", email="test_admin@todo.com", password="test_admin"
        )

    def test_get_users_unauth(self):
        response = self.view(self.request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_users_auth(self):
        force_authenticate(self.request, user=self.test_admin)
        response = self.view(self.request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
