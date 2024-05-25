import time

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from app.filters import UserFilter
from app.serializers import *


class CountryViewSet(viewsets.ModelViewSet):
    queryset = CountryModel.objects.all()
    serializer_class = CountryModelSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.order_by('id')
    serializer_class = UserModelSerializer
    filterset_class = UserFilter


class CurrentUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.order_by('id')
    serializer_class = CurrentUserSerializer


class RegisterView(APIView):
    def get(self, request):
        return render(request, 'index.html')

    def post(self, request):
        user = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        if User.objects.filter(username=user).exists():
            return Response({'message': 'Пользователь с таким логином уже существует'},status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            return Response({'message': 'Пользователь с таким email уже существует'}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(username=user, email=email, password=password)
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'status': status.HTTP_201_CREATED})


class LoginView(APIView):
    def get(self, request):
        return render(request, 'login.html')

    def post(self, request):
        user = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=user, password=password)
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'status': status.HTTP_200_OK})
        else:
            return Response({'message': 'Неверные логин или пароль'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logged out successfully'})


class FormView(APIView):
    def get(self, request):
        start_time = time.time()
        queryset = UserModel.objects.all()
        serialized_data = UserModelSerializer(queryset, many=True).data
        end_time = time.time()
        execution_time = end_time - start_time
        return Response({'status': status.HTTP_200_OK, 'data': serialized_data, 'time': execution_time})
    def post(self, request):
        family = request.data.get('family')
        name = request.data.get('name')
        surname = request.data.get('surname')
        age = request.data.get('age')
        sex = request.data.get('sex')
        country_data = request.data.get('country')
        print('country_data', country_data)
        if country_data:
            country_data = country_data['code']
        country = CountryModel.objects.filter(code=country_data).first()
        food = request.data.get('food')
        dietician = food['dietician']

        vegan = food['vegan']
        traditional = food['traditional']
        UserModel.objects.create(family=family, name=name, surname=surname, sex=sex, age=age, country=country,
                                 dietician=dietician, vegan=vegan, traditional=traditional)
        return Response({'status': status.HTTP_200_OK})
