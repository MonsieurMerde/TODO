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


class UserCreateMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String(required=True)

    user = graphene.Field(UserObjectType)

    @classmethod
    def mutate(cls, root, info, username, email, first_name=None, last_name=None):
        user = User(username=username, first_name=first_name, last_name=last_name, email=email)
        user.save()
        return cls(user)


class UserUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        username = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()

    user = graphene.Field(UserObjectType)

    @classmethod
    def mutate(cls, root, info, id, username=None, first_name=None, last_name=None, email=None):
        user = User.objects.get(pk=id)
        if username:
            user.username = username
        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        if email:
            user.email = email
        if username or first_name or last_name or email:
            user.save()
        return cls(user)


class UserDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    user = graphene.List(UserObjectType)

    @classmethod
    def mutate(cls, root, info, id):
        user = User.objects.get(pk=id)
        user.delete()
        return UserDeleteMutation(user=User.objects.all())


class ProjectDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    project = graphene.Field(ProjectObjectType)

    @classmethod
    def mutate(cls, root, info, id):
        project = Project.objects.get(pk=id)
        project.deleted = True
        project.save()
        return cls(project)


class Mutation(graphene.ObjectType):
    create_user = UserCreateMutation.Field()
    update_user = UserUpdateMutation.Field()
    delete_user = UserDeleteMutation.Field()
    delete_project = ProjectDeleteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
