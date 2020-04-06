from django.urls import path
from django.conf.urls import url
from . import views


urlpatterns = [
    path(r'', views.IndexView.as_view(), name='index'),
    path(r'polls', views.polls, name='polls')
]