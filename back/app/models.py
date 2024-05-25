from django.contrib.auth.models import AbstractUser, Permission, Group
from django.db import models


class CountryModel(models.Model):
    label = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    code = models.CharField(max_length=10)

    def __str__(self):
        return self.label


class UserModel(models.Model):
    GENDER_CHOICES = [
        ('М', 'Муж.'),
        ('Ж', 'Жен.'),
    ]
    family = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    age = models.IntegerField(default=0, null=True, blank=True)
    country = models.ForeignKey(CountryModel, on_delete=models.SET_NULL, null=True, blank=True)
    sex = models.CharField(max_length=10, choices=GENDER_CHOICES)
    traditional = models.BooleanField(default=False)
    dietician = models.BooleanField(default=False)
    vegan = models.BooleanField(default=False)

    def __str__(self):
        return self.family


class CurrentUser(AbstractUser):
    groups = models.ManyToManyField(Group, related_name='currentuser_groups')
    user_permissions = models.ManyToManyField(Permission, related_name='currentuser_user_permissions')

    def __str__(self):
        return self.username
