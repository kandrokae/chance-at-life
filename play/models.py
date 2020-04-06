import datetime

from django.db import models
from django.utils import timezone

class Question(models.Model):
    question_text = models.CharField(max_length=97)
    timestamp = models.FloatField(default=1.0)
    custom_id = models.IntegerField(default=1)
    choice1_text = models.CharField(max_length=10)
    choice1_timestamp = models.FloatField(default=1.0)
    choice1_skiptime = models.FloatField(default=1.0)
    price1 = models.IntegerField(default=0)
    choice2_text = models.CharField(max_length=10)
    choice2_timestamp = models.FloatField(default=1.0)
    choice2_skiptime = models.FloatField(default=1.0)
    price2 = models.IntegerField(default=0)
    skip_to = models.FloatField(default=1.0)


    def __str__(self):
        return self.question_text


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    choice_num = models.IntegerField(default=1)
    price = models.IntegerField(default=0)
    

    def __str__(self):
        return str(self.question)[:60] + ' - ' + self.choice_text
