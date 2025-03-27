from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password
from django.shortcuts import redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import *
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes   
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
User = get_user_model()

@api_view(['POST'])
def register_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"error": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(email=email, password=password)
    refresh = RefreshToken.for_user(user)

    return Response({
        "message": "User created successfully",
        "token": str(refresh.access_token)
    }, status=status.HTTP_201_CREATED)

# @csrf_exempt
# def register(request):
#     if request.method == "POST":
#         data = json.loads(request.body)
#         email = data.get('email')
#         password = data.get('password')

#         if CustomUser.objects.filter(email=email).exists():
#             return JsonResponse({"error": "Email already registered"}, status=400)

#         user = CustomUser.objects.create(email=email, password=make_password(password))
#         return JsonResponse({"message": "User registered successfully"}, status=201)

#     return JsonResponse({"error": "Invalid request"}, status=400)


@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(request, username=email, password=password)

    if user is None:
        return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    access = refresh.access_token  # Get access token from refresh

    return Response({
        "message": "Login successful",
        "access_token": str(access),
        "refresh_token": str(refresh),
        "user": {"email": user.email}
    }, status=status.HTTP_200_OK)




@api_view(['POST'])
# @permission_classes([IsAuthenticated])   
def logout_user(request):
    try:
        refresh_token = request.data.get("refresh_token")

        if not refresh_token:
            return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

        print(f"Received refresh token: {refresh_token}")   

        try:
            token = RefreshToken(refresh_token)
            print(f"Token payload: {token.payload}")   
            
            token.blacklist()   
            return Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(f"Token Error: {str(e)}")  
            return Response({"error": "Invalid or already logged out token"}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(f"Unexpected error: {str(e)}") 
        return Response({"error": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
def home(request):
    if request.user.is_authenticated:
        return JsonResponse({"message": f"Welcome, {request.user.email}!"})
    return JsonResponse({"error": "Unauthorized"}, status=401)


@api_view(['POST'])
def forgot_password(request):
    print("Received data:", request.data)  # Debugging line

    email = request.data.get('email')
    if not email:
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        return Response({"error": "User with this email does not exist"}, status=status.HTTP_404_NOT_FOUND)

    # Generate a 6-digit OTP
    otp = random.randint(100000, 999999)

    # Save OTP in database (assuming PasswordResetOTP model exists)
    PasswordResetOTP.objects.update_or_create(
        user=user, defaults={"otp": otp, "created_at": now()}
    )

    # Send OTP via email
    try:
        send_mail(
            subject="Your Password Reset OTP",
            message=f"Your OTP for password reset is: {otp}. It is valid for 10 minutes.",
            from_email="dharshinispriya1710@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )
        return Response({"message": "OTP sent to your email"}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": f"Failed to send email: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

 
 
@api_view(['GET'])   # Allow access without authentication
def get_user_profile(request):
    try:
        user_id = request.GET.get('id')  # Get user ID from query params
        if not user_id:
            return JsonResponse({"error": "User ID is required"}, status=400)

        user = CustomUser.objects.get(id=user_id)  # Fetch user by ID

        return JsonResponse({
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "date_joined": user.date_joined.strftime('%Y-%m-%d %H:%M:%S'),
        })

    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
 
 