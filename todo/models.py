from django.db import models

from users.models import User


class Project(models.Model):
    project_name = models.CharField(max_length=128)
    link = models.URLField(max_length=256, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    project_team = models.ManyToManyField(User)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.project_name}"


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.CharField(max_length=1024, blank=False)
    user_created = models.ForeignKey(User, default=None, on_delete=models.SET_DEFAULT)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)
    is_active = models.BooleanField(default=True)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"ToDo {self.pk} created in {self.project} by {self.user_created}"
