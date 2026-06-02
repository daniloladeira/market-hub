import os
import django
from django.conf import settings

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from customers.models import Client, Domain

def create_tenants():
    # Create the public tenant
    if not Client.objects.filter(schema_name='public').exists():
        tenant = Client(schema_name='public', name='Public Tenant')
        tenant.save()
        
        domain = Domain()
        domain.domain = 'localhost'
        domain.tenant = tenant
        domain.is_primary = True
        domain.save()
        print("Public tenant created.")
    else:
        print("Public tenant already exists.")

    # Create a test tenant
    if not Client.objects.filter(schema_name='test').exists():
        tenant = Client(schema_name='test', name='Test Store')
        tenant.save()
        
        domain = Domain()
        domain.domain = 'test.localhost'
        domain.tenant = tenant
        domain.is_primary = True
        domain.save()
        print("Test tenant 'test' created.")
    else:
        print("Test tenant 'test' already exists.")

if __name__ == "__main__":
    create_tenants()
