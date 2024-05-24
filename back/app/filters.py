from django_filters import rest_framework as filters
from app.models import UserModel


class UserFilter(filters.FilterSet):
    family = filters.CharFilter(lookup_expr='icontains')
    name = filters.CharFilter(lookup_expr='icontains')
    surname = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = UserModel
        fields = ['family', 'name', 'surname']
