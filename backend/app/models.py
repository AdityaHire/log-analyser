from django.db import models


class Logs(models.Model):
    CHOICES_LEVEL_CHOICES =[
        ('info', 'Info'),
        ('warning', 'Warning'),
        ('error', 'Error'),
    ]

    service_name =models.CharField(max_length=100)
    log_level = models.CharField(max_length=20,choices=CHOICES_LEVEL_CHOICES)
    response_time = models.FloatField()

    def __str__(self):
        return f"{self.service_name} - {self.log_level}"