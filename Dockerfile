# Étape 1 : Build du frontend
FROM node:18 as frontend
WORKDIR /app
COPY ecommerce-frontend/ .
RUN npm install && npm run build

# Étape 2 : Build du backend .NET
FROM mcr.microsoft.com/dotnet/sdk:8.0 as backend
WORKDIR /src
COPY EcommerceChatbot/ .
#RUN dotnet publish -c Release -o /app/out
# Copier le build frontend dans wwwroot du backend
COPY --from=frontend /app/build /src/wwwroot
RUN dotnet publish -c Release -o /app/out
# Après COPY --from=backend /app/out .
#RUN dotnet ef database update --no-build
# Étape 3 : Image finale
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Installer NGINX et dépendances
#RUN apt-get update && apt-get install -y nginx

# Copier les artefacts
#COPY --from=frontend /app/build /var/www/html
#COPY --from=backend /app/out .
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ports et commande
# Configuration des ports
#ENV ASPNETCORE_URLS=http://*:8080 
#EXPOSE 8080 
#render ne veut pas de port spécifique


# Étape finale : image runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=backend /app/out .
# Render fournit la variable PORT automatiquement
ENV ASPNETCORE_URLS=http://*:$PORT
EXPOSE $PORT
CMD ["dotnet", "EcommerceChatbot.dll"]
