"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from drf_yasg.openapi import Contact, Info, License
from drf_yasg.views import get_schema_view
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from todo.views import ProjectModelViewSet, ToDoModelViewSet
from users.views import UserModelViewSet

router = DefaultRouter()
router.register("users", UserModelViewSet)
router.register("projects", ProjectModelViewSet)
router.register("todo", ToDoModelViewSet)

schema_view = get_schema_view(
    Info(
        title="ToDo Task List",
        default_version="1.0",
        description="Documentation to ToDo API",
        contact=Contact(email="boss@todo.com"),
        license=License("MIT License"),
    ),
    public=True,
)

urlpatterns = [
    path("admin/", admin.site.urls, name="admin"),
    path("api/", include(router.urls), name="api"),
    path("api-auth/", include("rest_framework.urls")),
    path(
        "api-token-auth/",
        views.obtain_auth_token,
        name="token_auth",
    ),
    path("api-jwt/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api-jwt/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api-jwt/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("swagger/", schema_view.with_ui(), name="schema_swagger"),
    path("redoc/", schema_view.with_ui("redoc"), name="schema_redoc"),
    re_path(r"swagger(?P<format>\.json|\.yaml)", schema_view.without_ui(), name="schema_json"),
]
