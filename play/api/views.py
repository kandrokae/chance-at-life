from .serializers import QuestionSerializer, ChoiceSerializer
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, AllowAny

from play.models import Question, Choice

class QuestionListAPIView(generics.ListAPIView):
	lookup_field = 'custom_id'
	queryset = Question.objects.all()
	serializer_class = QuestionSerializer
	permission_classes = [AllowAny]

class ChoiceListAPIView(generics.ListAPIView):
	lookup_field = 'pk'
	queryset = Choice.objects.all()
	serializer_class = ChoiceSerializer
	permission_classes = [AllowAny]