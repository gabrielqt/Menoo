from django.urls import path
from .views import *

urlpatterns = [
    path('', menu, name='menu'),
    path('mesa/<int:number_table>', menu, name='menu'),
    path('pedidos/', OrderList.as_view(), name="orders_menu"),
    path('pedido/<int:pk>/', OrderDetail.as_view(), name="order-detail"),
]


'''   API - ENDPOINTS:     '''

urlpatterns += [
    path('api/order-list&status=<slug:status>/', OrdersListAPIView.as_view(), name='order-list'),
    path('api/order-retrieve/<int:id>/', OrdersRetrieveAPIView.as_view(), name='order-retrieve'),
    path('api/order-create/', OrderPostAPIView.as_view(), name='order-post'),
    ]