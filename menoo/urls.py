from django.urls import path
from .views import *

urlpatterns = [
    
]


'''   API - ENDPOINTS:     '''

urlpatterns += [
    path('api/order-list&status=<slug:status>/', OrdersListAPIView.as_view(), name='order-list'),
    path('api/order-retrieve/<int:id>/', OrdersRetrieveAPIView.as_view(), name='order-retrieve'),
    path('api/order-create/', OrderPostAPIView.as_view(), name='order-post')
    ]