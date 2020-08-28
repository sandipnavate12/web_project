from emp_app.models import EmployeeData
from django import forms

class CustomUserCreationForm(forms.ModelForm):
    class Meta:
        model = EmployeeData
        fields = '__all__'
