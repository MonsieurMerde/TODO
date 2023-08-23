from django_filters.rest_framework import CharFilter, FilterSet

from todo.models import Project, ToDo


class ProjectFilter(FilterSet):
    project_name = CharFilter(lookup_expr="contains")

    class Meta:
        model = Project
        fields = ["project_name"]


class ToDoFilter(FilterSet):
    class Meta:
        model = ToDo
        fields = ["project"]
