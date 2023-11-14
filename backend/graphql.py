import graphene
from graphene_django import DjangoObjectType

from todo.models import Project, ToDo
from users.models import User


class UserObjectType(DjangoObjectType):
    class Meta:
        model = User
        graphene.Fields = "__all__"


class ProjectObjectType(DjangoObjectType):
    class Meta:
        model = Project
        graphene.Fields = "__all__"


class ToDoObjectType(DjangoObjectType):
    class Meta:
        model = ToDo
        graphene.Fields = "__all__"


class Query(graphene.ObjectType):
    all_users = graphene.List(UserObjectType)

    def resolve_all_users(self, info):
        return User.objects.all()

    all_projects = graphene.List(ProjectObjectType)

    def resolve_all_projects(self, info):
        return Project.objects.all()

    all_todos = graphene.List(ToDoObjectType)

    def resolve_all_todos(self, info):
        return ToDo.objects.all()


schema = graphene.Schema(query=Query)
