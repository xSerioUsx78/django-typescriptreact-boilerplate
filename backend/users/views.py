from rest_framework import generics, permissions, authentication
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)


class LoginView(generics.GenericAPIView):
    authentication_classes = [authentication.TokenAuthentication,]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        data = {
            "user": UserSerializer(
                user, context=self.get_serializer_context()).data,
            "token": token.key
        }
        return Response(data=data, status=status.HTTP_200_OK)


class LogoutView(generics.GenericAPIView):
    authentication_classes = [authentication.TokenAuthentication,]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # We get the user and destroy the token
        user = request.user
        try:
            token = Token.objects.get(user=user)
            token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)


class UserView(generics.RetrieveAPIView):
    authentication_classes = [
        authentication.TokenAuthentication, 
        authentication.SessionAuthentication
    ]
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user