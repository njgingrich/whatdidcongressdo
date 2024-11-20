from django.shortcuts import render

from congress_api.models import Bill

def index(request):
    return render(request, 'index.html')

def house_index(request):
    return render(request, 'routes/house/index.html')

def house_bills(request):
    bills = Bill.objects.order_by('-latest_action_date')[:10]
    context = {
        'bills': bills
    }
    return render(request, 'routes/house/bills.html', context)
