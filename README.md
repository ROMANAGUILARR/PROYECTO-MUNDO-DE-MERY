# Aplicativo web para el proceso de compra y pedido de la empresa Mundo de Mery

Tienda web de cerámica artesanal con catálogo de productos, carrito de compras en cliente, autenticación de usuarios mediante credenciales y Google, además de consulta de datos de personas por DNI mediante integración externa.

---

## 📖 Tabla de contenidos

- [📝 Descripción](#-descripción)
- [🔴 Problema que soluciona](#-problema-que-soluciona)
- [🏗️ Arquitectura](#-arquitectura)
- [💎 Características](#-características)
- [📋 Requisitos previos](#-requisitos-previos)
- [💻 Tecnologías usadas](#-tecnologías-usadas)
- [🛠️ Configuración](#-configuración)
- [▶️ Ejecución](#-ejecución)
- [⚙️ Funcionalidades principales](#-funcionalidades-principales)

---

## 📝 Descripción

Proyecto web fullstack orientado a la gestión y visualización de productos de cerámica decorativa. La aplicación permite a los usuarios registrarse, autenticarse y navegar por un catálogo de productos, utilizando una arquitectura separada entre frontend y backend que facilita la escalabilidad y el mantenimiento.

---

## 🔴 Problema que soluciona

La empresa **“Mundo de Mery”** presenta dificultades en su operación diaria debido a que el manejo de inventarios y pedidos se realiza de forma manual, provocando desorden, posibles errores en los registros y una gestión poco eficiente del negocio.

Además, la falta de presencia digital dificulta llegar a nuevos clientes y aprovechar oportunidades de venta, limitando el crecimiento del emprendimiento.

---

## 🏗️ Arquitectura

```text
┌─────────────┐     HTTP      ┌─────────────┐     JDBC      ┌──────────┐
│  Next.js    │ ────────────► │ Spring Boot │ ────────────► │  MySQL   │
│   :3000     │               │   :8080     │               │  :3306   │
└─────────────┘               └──────┬──────┘               └──────────┘
                                     │
                                     ├── Google tokeninfo
                                     └── PeruDevs DNI API
```

---

## 💎 Características

- 🔐 Autenticación de usuarios (registro e inicio de sesión).
- 🛡️ Seguridad mediante JWT.
- 👥 Gestión de roles de usuario (usuario y administrador).
- 🛍️ Catálogo de productos.
- 🛒 Carrito de compras en cliente.
- 🌐 Inicio de sesión con Google.
- 🎨 Interfaz moderna y responsiva.
- 🔗 Comunicación entre frontend y backend mediante API REST.

---

## 📋 Requisitos previos

- [Docker](https://www.docker.com/) y Docker Compose (para MySQL).
- [JDK 21](https://adoptium.net/) y [Maven](https://maven.apache.org/)  
  *(o utilizar `./mvnw` dentro de `backend/`)*.
- [Node.js](https://nodejs.org/) (recomendado versión LTS) y npm.

---

## 💻 Tecnologías usadas

| Capa | Tecnología |
|------|------------|
| **Frontend** | [Next.js](https://nextjs.org/) 16, React 19, TypeScript, Tailwind CSS 4 |
| **Backend** | [Spring Boot](https://spring.io/projects/spring-boot) 4, Java 21 |
| **Seguridad** | Spring Security, JWT (jjwt) |
| **Base de datos** | MySQL 8 (Docker) |
| **Otros** | Lombok, Guava |

---

## 🛠️ Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/haroldqn/proyecto_ceramica.git
```

### 2. Instalar dependencias

```bash
npm install
```
---

## ▶️ Ejecución

### 1️⃣ Backend (local con Maven)

```bash
cd backend
./mvnw clean package
./mvnw spring-boot:run
```

Por defecto, la aplicación utiliza la configuración ubicada en:

```text
backend/src/main/resources/application.properties
```

---

### 2️⃣ Frontend (modo desarrollo)

```bash
cd frontend
npm install
npm run dev
```

---

### 3️⃣ Levantar todo con Docker Compose

```bash
docker compose up --build
```

---

## ⚙️ Funcionalidades principales

- Registro e inicio de sesión de usuarios.
- Autenticación segura mediante JWT.
- Inicio de sesión con Google.
- Visualización de catálogo de productos.
- Organización de productos por categorías.
- Consulta de detalles de cada producto.
- Carrito de compras en cliente.
- Integración con API REST entre frontend y backend.
- Consulta de datos de persona por DNI.
- Interfaz web moderna y responsiva.
