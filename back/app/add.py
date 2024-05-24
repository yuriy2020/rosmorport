from app.choices import COUNTRIES
from app.models import CountryModel


for country in COUNTRIES:
    country = CountryModel(label=country[0], phone=country[1], code=country[2])
    country.save()
