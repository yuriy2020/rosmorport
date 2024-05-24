from django.conf import settings
from django.conf.urls import include
from django.conf.urls.static import static
from django.urls import path
from rest_framework.routers import DefaultRouter
from app.urls import ccm_router
from app.views import *

router = DefaultRouter()
router.registry.extend(ccm_router.registry)


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('form/', FormView.as_view(), name='form'),
    path('api_v1/', include(router.urls)),
    path('country/', CountryViewSet.as_view({'get': 'list'})),
]

if settings.DEBUG:
    urlpatterns += [path('', RegisterView.as_view())]
