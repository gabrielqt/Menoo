# Generated by Django 5.1 on 2024-08-19 22:45

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80, verbose_name='name')),
            ],
            options={
                'verbose_name': 'Categoria',
                'verbose_name_plural': 'Categorias',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Food',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80, verbose_name='name')),
                ('description', models.TextField(verbose_name='Description')),
                ('price', models.FloatField(validators=[django.core.validators.MinValueValidator(0.0)], verbose_name='Float')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menoo.category')),
            ],
            options={
                'verbose_name': 'Alimento',
                'verbose_name_plural': 'Alimentos',
                'ordering': ['price'],
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_date', models.DateTimeField(auto_now_add=True, verbose_name='Data-Hora do pedido')),
                ('note', models.TextField(blank=True, null=True, verbose_name='Observation')),
                ('customer_name', models.CharField(max_length=90, verbose_name='Customer Name')),
                ('customer_phone_number', models.CharField(max_length=11, validators=[django.core.validators.RegexValidator(message="O número de telefone deve estar no formato: '(dd)988888888'. Até 11 dígitos são permitidos.", regex='^\\d{2}\\d{9}$')])),
                ('status', models.CharField(choices=[('Aguardando Atendimento', 'Aguardando Atendimento'), ('Em Preparo', 'Em Preparo'), ('Entregue', 'Entregue'), ('Pago', 'Pago')], default='Aguardando Atendimento', max_length=22)),
                ('foods', models.ManyToManyField(to='menoo.food')),
            ],
            options={
                'ordering': ['order_date'],
            },
        ),
    ]
