# 
python 3.7.x
сделать venv и войти

```shell
.\venv\Scripts\activate
```


- далее подгрузить из  [requirements.txt](requirements.txt)
```shell
pip install -r requirements.txt
```
#
- создание базы \
```shell
psql -U postgres -h localhost -p 5432 -c "CREATE DATABASE rmp;"
```


python manage.py makemigration
python manage.py migrate


Для запуска кода, который создает объекты модели CountryModel, вам нужно выполнить следующие шаги:

Откройте Django shell командой python manage.py shell в корневой папке вашего проекта.
Введите следующий код:

```
from app.models import CountryModel
from app.choices import COUNTRIES

for country in COUNTRIES:
    country = CountryModel(label=country[0], phone=country[1], code=country[2])
    country.save()
```

- далее 2 раза Enter
 ## запустить сервер на 5000 порту
```shell
python manage.py runserver 5000
```