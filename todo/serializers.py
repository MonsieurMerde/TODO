from rest_framework.serializers import ModelSerializer

from .models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "project_name",
            "link",
            "description",
            "project_team",
        ]


class ToDoModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = [
            "project",
            "text",
            "user_created",
            "is_active",
            "created",
            "deleted",
        ]
