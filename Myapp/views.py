from django.http import JsonResponse
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import render,redirect
from django.views.generic import View,TemplateView,DetailView
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_exempt



@csrf_exempt  # Exempt CSRF for this API (only for development; use CSRF tokens in production)
def send_message(request):
    if request.method == "POST":
        try:
            # Parse the JSON data
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            phone = data.get('phone', 'Not provided')  # Optional field
            message = data.get('message')

            # Compose the email
            subject = f"Contact Form Submission from {name}"
            body = f"Name: {name}\nEmail: {email}\nPhone: {phone}\n\nMessage:\n{message}"
            recipient = 'muhammadameens123@gmail.com'  # Replace with your email address

            # Send the email
            send_mail(subject, body, email, [recipient])

            return JsonResponse({'success': True, 'message': 'Message sent successfully!'})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)

    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=405)


class IndexView(View):
    def get(self,request,*args,**kwargs):
        return render(request,"index.html")
    

class AboutView(View):
    def get(self,request,*args,**kwargs):
        return render(request,"about.html")
    
