# Сервис для онлайн-заказа продуктов

## Краткое описание

Проект предназначен для онлайн-заказа продуктов.

### Реализованный функционал:
- регистрация и авторизация
- редактирования личных данных
- просмотр продуктов и категорий
- просмотра содержимого корзины
- добавление продуктов в корзину
- создание заказа
- просмотра истории заказов

## Используемые технологии

### Backend:
- **ASP.NET Core** 6.0.4
- **Entity Framework Core** 6.0.5 + **Identity.EntityFramework**
- **Npgsql (Postgres database)**

### Frontend:

- **React.js** 18.1.0 и выше
- **Reduxjs/toolkit** 1.8.1 и выше
- **Node.js** 16.14.2 и выше

## Требования для сборки и запуска приложения

### Требования:

1. .NET 6
2. Node.js и npm
3. Postgresql (версии >=14)
4. Установленные NuGet пакеты, требуемые для проекта

### Шаги для развертывания:

1. Указать в **appsettings.json** проекта **bars-group-delivery.WebAPI** 
    1. строку подключения базы данных в "DefaultConnection"
    2. настройки для JWT-токена (минимальная длина секрета 16 символов)
2. Указать строку подключения в **DesignTimeIdentityDbContextFactory.cs** проекта **bars-group-delivery.WebAPI**
3. Выполнить команду Update-database
4. Указать в **appsettings.json** проекта **bars-group-delivery.WebAPI** url-сервера в **applicationUrl**
5. Указать в **setupProxy.js** прокета **client-app** url-сервера в **target** для конфигурации прокси 
