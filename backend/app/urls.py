from django.urls import path
from . import views

urlpatterns = [
    path('logs/', views.log_list),
    path('logs/average-response/', views.avg_response_time),
    path('logs/slowest/', views.slowest_requests),
    path('logs/error-count/', views.error_count_per_service),
]
