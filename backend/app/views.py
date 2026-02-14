from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Avg, Count
from .models import Logs
from .serializers import LogsSerializer


@api_view(['GET', 'POST'])
def log_list(request):
    if request.method == 'GET':
        logs = Logs.objects.all()
        serializer = LogsSerializer(logs, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = LogsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


@api_view(['GET'])
def avg_response_time(request):
    avg_time = Logs.objects.aggregate(avg_time=Avg('response_time'))
    return Response(avg_time)

@api_view(['GET'])
def slowest_requests(request):
    logs = Logs.objects.order_by('-response_time')[:5]
    serializer = LogsSerializer(logs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def error_count_per_service(request):
    errors = (
        Logs.objects
        .filter(log_level='ERROR')
        .values('service_name')
        .annotate(error_count=Count('id'))
    )
    return Response(errors)
