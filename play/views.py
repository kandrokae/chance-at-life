from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic
from .models import Question, Choice

class IndexView(generic.ListView):
	template_name =  'play/index.html'
	context_object_name = 'all_questions'

	def get_queryset(self):
		return Question.objects.all()

def polls(request):
	return HttpResponse("Where polls happen")

class WelcomeView(generic.ListView):
	template_name = 'play/landingpage.html'

	def get_queryset(self):
		return "placeholder"