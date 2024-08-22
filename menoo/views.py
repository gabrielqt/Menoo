from django.shortcuts import render
from django.http import HttpResponse    
from .models import *
from .serializers import OrderSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView



def menu(request, number_table):
    
    category = Category.objects.all()
    foods = Food.objects.all()
    
    context = {'categories':category, 'foods':foods}

    return render(request,'menu.html',context=context)





'''   API    '''
class OrdersListAPIView(ListAPIView):
    
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    
    def get_queryset(self):
        status = self.kwargs.get('status', None)
        if status is not None:
            match status:
                case 'ag':
                    return self.queryset.filter(status='Aguardando Atendimento')
    
                case 'pg':
                    return self.queryset.filter(status='Pago')
    
                case 'et':
                    return self.queryset.filter(status='Entregue')
    
                case 'ep':
                    return self.queryset.filter(status='Em Preparo')
                
                case _:
                    return self.queryset.all()
                
                    
class OrdersRetrieveAPIView(RetrieveAPIView):
    
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    
    def get_object(self):
        return self.queryset.get(id=self.kwargs.get('id'))
    
    
class OrderPostAPIView(CreateAPIView):
    
    queryset = Order.objects.all()
    serializer_class = OrderSerializer