# 🌐 Frontend - SinapsisCampaign (Angular 18)

Este proyecto es el frontend del sistema de campañas de mensajería, desarrollado en **Angular 18** y diseñado para trabajar en conjunto con un backend construido en **NestJS + Serverless Framework**.

---

## ✅ Requisitos Previos

Asegúrate de tener instalado:

- ⚙️ [Node.js](https://nodejs.org/) (versión recomendada: LTS)
- 📦 [npm](https://www.npmjs.com/)
- 🌍 [Angular CLI](https://angular.io/cli)

```bash
npm install -g @angular/cli@18
```

---

## 🚀 Instalación del Proyecto

1. **Clonar el repositorio**
```bash
git clone https://github.com/RobertLYucra/sinapsis-campaign-frontend.git
cd sinapsis-campaign-frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
ng serve
```

El frontend estará disponible en [`http://localhost:4200`](http://localhost:4200).

---

## 🧪 Comandos Útiles

### 🔨 Compilar el proyecto
```bash
ng build
```
Los archivos generados se guardarán en el directorio `dist/`.


## 📡 Conexión con el Backend

El frontend está preparado para consumir los servicios del backend NestJS, que expone endpoints documentados con Swagger en:

```bash
http://https://u20p7u4p5i.execute-api.us-east-1.amazonaws.com/api/swagger
```

Asegúrate de que el backend esté corriendo en paralelo.

---

## 📁 Estructura del Proyecto

```bash
src/
├── app/
│   ├── core/
│   │   ├── constants/            # Constantes globales (URLs, etc.)
│   │   └── interfaces/           # Interfaces reutilizables
│
│   ├── main/
│   │   ├── campaign/             # Módulo para gestión de campañas
│   │   │   ├── interfaces/       # Interfaces específicas
│   │   │   ├── modal/            # Componentes para crear/editar campañas
│   │   │   ├── services/         # campaign.service.ts
│   │   │   └── campaign.component.* # Vista principal de campañas
│   │   ├── message/              # Módulo para mensajes por campaña
│   │   │   ├── interfaces/
│   │   │   ├── services/
│   │   │   └── message.component.*
│   │   └── user/                 # Placeholder para futuros usuarios
│   │   │   ├── interfaces/
│   │   │   ├── services/   
│   ├── material/                 # Centraliza imports Angular Material
│   │   ├── material.module.ts    # Todos los módulos de Angular Material
│   │   └── material.utils.ts     # Utilidades comunes para Material
│
│   ├── main.module.ts            # Módulo principal que importa todo
│   ├── app-routing.module.ts     # Definición de rutas
│   ├── app.component.*           # Root component
│   └── app.module.ts             # Root Module
│
├── assets/                       # Archivos estáticos
├── environments/                 # Variables de entorno (dev/prod)
├── styles.scss                   # Estilos globales
├── main.ts                       # Punto de entrada de la app
├── index.html                    # HTML principal
└── favicon.ico                   # Ícono de pestaña


```


