from django.urls import path
from .views import *

urlpatterns = [
    path('', menu, name='menu'),
    path('mesa/<int:number_table>', menu, name='menu'),
    path('pedidos/', OrderList.as_view(), name="orders_menu"),
    path('pedido/<int:pk>/', OrderDetail.as_view(), name="order-detail"),
    path('deletar/', delete_food, name='delete-food')
]

''' FORMS:  '''

urlpatterns += [
    path('nova_categoria/', create_category, name='new_category'),
    path('novo_alimento/', create_food, name="new_food")
]


''' ACTIONS:  '''

urlpatterns += [
    path('visualizar_pedido/<int:pk>/', view_order, name='view-order'),
    path('deletar_pedido/<int:pk>',delete_order, name='delete-order'),
    path('deletar_todos_pedidos/',delete_all_orders,name='clean-orders')
]

'''   API - ENDPOINTS:     '''

urlpatterns += [
    path('api/order-list&status=<slug:status>/', OrdersListAPIView.as_view(), name='order-list'),
    path('api/order-retrieve/<int:id>/', OrdersRetrieveAPIView.as_view(), name='order-retrieve'),
    path('api/order-create/', OrderPostAPIView.as_view(), name='order-post'),
    ]