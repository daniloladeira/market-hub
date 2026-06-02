import os
import django
from django.db import connection

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from customers.models import Client
from catalog.models import Product, Inventory

def populate_test_tenant():
    # Switch to test tenant schema
    tenant = Client.objects.get(schema_name='test')
    connection.set_tenant(tenant)
    
    # Create products
    p1 = Product.objects.create(
        name="Smartphone XYZ",
        slug="smartphone-xyz",
        description="Um smartphone incrível.",
        price=1500.00
    )
    Inventory.objects.create(product=p1, quantity=10)

    p2 = Product.objects.create(
        name="Laptop Pro",
        slug="laptop-pro",
        description="Potência máxima para trabalho.",
        price=4500.00
    )
    Inventory.objects.create(product=p2, quantity=5)

    print("Products created in 'test' tenant.")

if __name__ == "__main__":
    populate_test_tenant()
