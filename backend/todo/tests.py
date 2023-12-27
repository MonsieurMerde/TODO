import json
import random

from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIClient, APITestCase, RequestsClient
from todo.models import Project
from users.models import User


class ProjectsTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.test_admin = User.objects.create_superuser(
            username="test_admin", email="test_admin@todo.com", password="test_admin"
        )
        self.test_project_1 = Project.objects.create(
            project_name="test_project_1",
            link="https://todo.com/test_project_1",
            description="test_project_1_description",
        )
        self.test_project_1.save()
        self.test_project_1.project_team.add(self.test_admin)

    def test_get_projects(self):
        self.client.login(username="test_admin", password="test_admin")
        response = self.client.get("/api/projects/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_project(self):
        self.client.login(username="test_admin", password="test_admin")
        response = self.client.post(
            "/api/projects/",
            {
                "project_name": "test_project_2",
                "link": "http://todo.com/test_project_2/",
                "description": "test_project_2_description",
                "project_team": [self.test_admin.id],
            },
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.get("/api/projects/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ProjectsAPITestCase(APITestCase):
    def setUp(self):
        self.test_admin = User.objects.create_superuser(
            username="test_admin", email="test_admin@todo.com", password="test_admin"
        )
        self.users = mixer.cycle(10).blend(User)
        self.projects = mixer.cycle(5).blend(
            Project,
            project_team=mixer.sequence(
                lambda users_in_projects: random.sample(self.users, random.randint(1, len(self.users)))
            ),
        )

    def test_get_projects(self):
        self.client.login(username="test_admin", password="test_admin")
        response = self.client.get("/api/projects/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_project(self):
        self.client.login(username="test_admin", password="test_admin")
        response = self.client.put(
            "/api/projects/1/",
            {
                "id": 1,
                "project_name": "Edited project name",
                "link": "http://todo.com/edited_link/",
                "description": "Edited description",
                "project_team": [self.test_admin.id],
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=1)
        self.assertEqual(project.description, "Edited description")


# Live-тест с использованием RequestsClient

requests_client = RequestsClient()
json_data = json.dumps({"username": "user2", "password": "user2"})
jwt_response = requests_client.post(
    "http://127.0.0.1:8000/api-jwt/", headers={"Content-Type": "application/json"}, data=json_data
)
jwt_token = jwt_response.json()["access"]

url = "http://127.0.0.1:8000/api/todo"
headers = {"Authorization": f"Bearer {jwt_token}"}
response = requests_client.get(url, headers=headers)
assert response.status_code == 200
