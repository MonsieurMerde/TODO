from rest_framework.serializers import HyperlinkedModelSerializer, StringRelatedField

from .models import Project, ToDo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    project_team = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = [
            "project_name",
            "link",
            "description",
            "project_team",
        ]


class ToDoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = [
            "project",
            "text",
            "user_created",
            "is_active",
            "deleted",
        ]
