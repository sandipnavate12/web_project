from django.shortcuts import render
from emp_app.models import EmployeeData
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse,HttpResponse
from .forms import CustomUserCreationForm
# Create your views here.

def new_emp(request):

    Employees = EmployeeData.objects.all()
    return render(request,'emp_app/employee_details.html',{"employees":Employees})


class DeleteEmployee(View):
    def  get(self, request):
        id1 = request.GET.get('id', None)
        EmployeeData.objects.get(id=id1).delete()
        data = {
            'deleted': True
        }
        return JsonResponse(data)

@csrf_exempt
def addEmployee(request):
    id1 = request.POST.get('id', None)
    first_name1 = request.POST.get('first_name', None)
    last_name1 = request.POST.get('last_name', None)
    e_mail1 = request.POST.get('e_mail', None)
    dob1 = request.POST.get('dob', None)
    salary1 = request.POST.get('salary', None)
    country1 = request.POST.get('country', None)

    obj = EmployeeData.objects.create(
        id = id1,
        first_name = first_name1,
        last_name = last_name1,
        e_mail = e_mail1,
        dob = dob1,
        salary = salary1,
        country = country1
    )

    employee = {'id':obj.id,'first_name':obj.first_name,'last_name':obj.last_name,'e_mail':obj.e_mail,
    'dob':obj.dob,'salary':obj.salary,'country':obj.country}

    data = {
        'user': employee
    }
    return JsonResponse(data)


@csrf_exempt
def updateEmpView(request):

    if request.method=="POST":

        id1 = request.POST.get('id', None)
        first_name1 = request.POST.get('first_name', None)
        last_name1 = request.POST.get('last_name', None)
        e_mail1 = request.POST.get('e_mail', None)
        dob1 = request.POST.get('dob', None)
        salary1 = request.POST.get('salary', None)
        country1 = request.POST.get('country', None)

        try:

            obj = EmployeeData.objects.get(id=id1)
            obj.first_name = first_name1
            obj.last_name = last_name1
            obj.e_mail = e_mail1
            obj.dob = dob1
            obj.salary = salary1
            obj.country = country1

            obj.save()
            print("Hello there")
            employee = {'id':obj.id,'first_name':obj.first_name,'last_name':obj.last_name,'e_mail':obj.e_mail,
            'dob':obj.dob,'salary':obj.salary,'country':obj.country}

            data = {
                'employee': employee
            }
            return JsonResponse(data)
        except Exception as e:
            print(e)

    else:
        return HttpResponse("Bad request")
