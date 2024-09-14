from django.shortcuts import render, redirect
from django.http import HttpResponse    
from django.views.generic import ListView, DetailView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from .models import *
from .serializers import OrderSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from .forms import *


def menu(request, number_table):
    
    category = Category.objects.all()
    foods = Food.objects.all().order_by('category')
    
    context = {'categories':category, 'foods':foods}

    return render(request,'menu.html',context=context)


def create_category(request):
    
    if request.method == "POST":
        form = NewCategory(request.POST)
        if form.is_valid():
            form.save()
            return redirect('orders_menu')
    else:
        form = NewCategory()
        
    return render(request, 'form.html', context={"form":form, "title":"Categoria"})

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
    
@require_POST   
def view_order(request,pk):
    
    obj = Order.objects.get(pk=pk)
    obj.status = "Visto"
    obj.save()
    
    return redirect(request.POST.get('current'))

@require_POST
def delete_order(request,pk):
    
    obj = Order.objects.get(pk=pk)
    obj.delete()
    return redirect('orders_menu')

@require_POST
def delete_all_orders(request):
    
    obj = Order.objects.all()
    obj.delete()
    return redirect('orders_menu')
    


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
