from django.shortcuts import render
from django.http import HttpResponse    
from django.views.generic import ListView, DetailView
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import *
from .serializers import OrderSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView



def menu(request, number_table):
    
    category = Category.objects.all()
    foods = Food.objects.all()
    
    context = {'categories':category, 'foods':foods}

    return render(request,'menu.html',context=context)


class OrderList(LoginRequiredMixin, ListView):
    
    queryset = Order.objects.all().order_by('-order_date')
    template_name = 'menu_orders.html'
    context_object_name = 'orders'
    paginate_by = 21
    
class OrderDetail(LoginRequiredMixin, DetailView):
    
    model = Order
    template_name = 'order-detail.html'
    context_object_name = 'order'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["foods"] = OrderFood.objects.filter(order_id=self.object.id)
        return context
    


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
