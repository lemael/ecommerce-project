FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY EcommerceChatbot.csproj ./
RUN dotnet restore EcommerceChatbot.csproj

COPY . .
RUN dotnet publish EcommerceChatbot.csproj -c Release -o /app/out --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Railway injects PORT at runtime
ENV ASPNETCORE_ENVIRONMENT=Production
CMD ["sh", "-c", "ASPNETCORE_URLS=http://0.0.0.0:${PORT:-8080} exec dotnet EcommerceChatbot.dll"]
