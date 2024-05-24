from rest_framework.routers import DefaultRouter

from app.views import *

ccm_router = DefaultRouter(trailing_slash=False)
ccm_router.register('Country', CountryViewSet, basename='Country')
ccm_router.register('User', UserViewSet, basename='User')
ccm_router.register('CurrentUser', CurrentUserViewSet, basename='CurrentUser')

reg = ccm_router.register
