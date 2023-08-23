from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .filters import ProjectFilter, ToDoFilter
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoLimitOffsetPagination
    filterset_class = ToDoFilter

    def destroy(self, request, *args, **kwargs):
        instanse = self.get_object()
        serializer = ToDoModelSerializer(instanse, data={"deleted": True}, context={"request": request}, partial=True)
        serializer.is_valid()
        serializer.save()
        return Response(serializer.data)
