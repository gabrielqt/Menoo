# Generated by Django 5.1 on 2024-09-07 19:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menoo', '0006_remove_order_foods_orderfood'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='foods',
            field=models.ManyToManyField(through='menoo.OrderFood', to='menoo.food'),
        ),
    ]
