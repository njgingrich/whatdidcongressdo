from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("house/", views.house_index, name="house_index"),
    path("house/bills", views.house_bills, name="house_bills"),
]
