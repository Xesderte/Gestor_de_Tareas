# ✅ Gestor de Tareas

Una aplicación web moderna y responsiva para la gestión de actividades diarias, diseñada para ayudar a los usuarios a mantener el enfoque y la productividad mediante el seguimiento de tareas, filtrado avanzado y métricas en tiempo real.

**🔗 Enlace en vivo:** [Inserta el link de tu proyecto en Vercel aquí]

---

## 🛠️ Tecnologías y Herramientas

Este proyecto fue desarrollado utilizando un stack moderno enfocado en la escalabilidad y el rendimiento:

* **Frontend:** React 19, TypeScript, Vite.
* **Estilos:** CSS3 nativo con variables globales (Custom Properties) para soporte de temas claro/oscuro y diseño completamente responsivo.
* **Backend as a Service (BaaS):** Firebase (Authentication y Firestore) con Reglas de Seguridad estrictas.
* **Serverless & Notificaciones:** Vercel Functions (`/api`) integrado con el SDK de **AWS SES** para envío de correos transaccionales.
* **Testing:** Vitest y React Testing Library para pruebas unitarias y de componentes con simulación (mocks) de servicios externos.

---

## 🚀 Instalación y Ejecución Local

Para clonar y probar este proyecto en un entorno local, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone [TU_LINK_DE_GITHUB]
    cd Gestor_de_Tareas
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz del proyecto y agrega tus credenciales de Firebase y AWS (las credenciales de AWS deben ingresarse sin el prefijo `VITE_` para seguridad del servidor):
    ```env
    VITE_FIREBASE_API_KEY="..."
    VITE_FIREBASE_AUTH_DOMAIN="..."
    VITE_FIREBASE_PROJECT_ID="..."
    # Resto de credenciales de Firebase...
    
    AWS_ACCESS_KEY_ID="..."
    AWS_SECRET_ACCESS_KEY="..."
    AWS_REGION="sa-east-1"
    AWS_SES_FROM_EMAIL="..."
    ```

4.  **Levantar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

---

## 🧪 Instrucciones de Prueba para Evaluadores (Sistema de Correos)

El sistema cuenta con una integración Serverless que envía un correo de bienvenida automático a los nuevos usuarios. 

**Nota Técnica sobre AWS SES:** Actualmente, la cuenta de Amazon Web Services se encuentra en modo **Sandbox**. Por políticas de seguridad estricta de AWS, los correos solo pueden enviarse hacia direcciones de email previamente verificadas por el administrador.

Para facilitar la evaluación sin necesidad de solicitar permisos o utilizar sus correos personales, he pre-verificado direcciones de **Yopmail**. Se utiliza `@yopmail.com` porque permite acceder a bandejas de entrada públicas sin requerir contraseñas ni verificación telefónica, agilizando el flujo de prueba.

mails de @yopmail verificados
<img alt="Image" width="1566" height="356" src="https://private-user-images.githubusercontent.com/106680584/616394539-1437f4c0-eb68-4e7f-884c-42c9ea45b937.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODMwMDY1ODYsIm5iZiI6MTc4MzAwNjI4NiwicGF0aCI6Ii8xMDY2ODA1ODQvNjE2Mzk0NTM5LTE0MzdmNGMwLWViNjgtNGU3Zi04ODRjLTQyYzllYTQ1YjkzNy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNzAyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDcwMlQxNTMxMjZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0yNmVjODg3MmI3MzRmNTRhMWM0MzVkN2Y3ZGY0ZGJhM2E5NmJmZGVjNWNhNGUxZGVkYjAxNzM3MjM4ZGIxNjc5JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcifQ.LFifqr2qQUNS6cf7J5SXtHWgkxfXSjg0um4F72VatiY">

**Pasos para probar el registro y la recepción del correo:**
1. Ingrese a la aplicación web y diríjase a la vista de **Registro**.
2. Utilice **obligatoriamente** uno de los siguientes correos electrónicos para crear la cuenta:
   * `juanmanuel.pruba01@yopmail.com`
   * `carloscanale.prueba02@yopmail.com`
3. Complete los demás campos (nombre y contraseña segura) y presione "Crear Cuenta".
4. Abra una nueva pestaña y diríjase a [yopmail.com](https://yopmail.com/).
5. Ingrese el correo utilizado en el cuadro de búsqueda para acceder a la bandeja pública y verificar la recepción exitosa del correo enviado por nuestra Serverless Function.
 <img alt="Image" width="1919" height="909" src="https://private-user-images.githubusercontent.com/106680584/616401883-ed356fca-c760-4e67-b215-50e84b3325b6.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODMwMDc0ODEsIm5iZiI6MTc4MzAwNzE4MSwicGF0aCI6Ii8xMDY2ODA1ODQvNjE2NDAxODgzLWVkMzU2ZmNhLWM3NjAtNGU2Ny1iMjE1LTUwZTg0YjMzMjViNi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNzAyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDcwMlQxNTQ2MjFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0zNDYxZDA0OTM0OTQxYzVkYWVjN2QyYzc1NzJhMTRjMDZlNDRkNWU2ZGFlYTU3YjNiM2JmZGRlNzhlNzM1OWUzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcifQ.doyOv58WUyULLNwbeUSXZKKyixlozy2O1ZEKCpBwOjQ">

---

## 🏗️ Arquitectura y Organización del Proyecto

El proyecto sigue una **arquitectura por capas** y un diseño modular para garantizar el desacoplamiento, la facilidad de pruebas y el mantenimiento a largo plazo.

* **`/api`**: Contiene la función Serverless de Vercel (`send-email.ts`) que maneja de forma segura el SDK de AWS SES, manteniendo las claves fuera del alcance del frontend.
* **`/src/components`**: Implementa el patrón *Atomic Design* simplificado:
    * `/ui`: Componentes puros y reutilizables (Botones, Inputs, Modales, Badges).
    * `/layout`: Estructura principal de la aplicación (Header, Footer).
    * `/auth` y `/tasks`: Componentes específicos de dominio (Formularios, Listas de tareas).
* **`/src/context`**: Gestión del estado global, aislando la lógica de autenticación en `AuthContext.tsx`.
* **`/src/hooks`**: Custom hooks (`useAuth`, `useTasks`, `useForm`) que extraen la lógica de negocio y el manejo de estado de las vistas, manteniendo los componentes de React limpios.
* **`/src/services`**: Capa de abstracción de datos. 
    * `/firebase`: Lógica de comunicación directa con Firestore y Firebase Auth.
    * Se implementó un `serviceFactory.ts` que permite inyectar dependencias y cambiar fácilmente entre persistencia local y en la nube.
* **`/src/test`**: Archivos de configuración de Vitest y pruebas unitarias aisladas (implementando una carpeta `__mocks__` en los servicios para no consumir cuota de red real durante los tests).

El diseño visual es completamente **responsive**, utilizando Flexbox y CSS Grid (implementados en `App.css` e `index.css`) para adaptarse a cualquier tamaño de pantalla de manera fluida.

---

## 📝 Convención de Commits

El historial de versiones de este repositorio sigue el estándar de **Conventional Commits** para mantener una trazabilidad semántica y ordenada. 

Los commits recientes fueron estructurados focalizándose en el cumplimiento y corrección exacta de los criterios de la rúbrica de evaluación. Ejemplos de uso:
* `feat:` para la implementación de nuevas funcionalidades (ej: *feat: integración de AWS SES en serverless function*).
* `fix:` para la resolución de bugs (ej: *fix: corrección de reglas de seguridad en Firestore para creación de tareas*).
* `test:` para la adición o mejora del entorno de pruebas unitarias.

---

## 🤖 Uso Crítico y Responsable de IA

*(En esta sección, deberás redactar en tus propias palabras cómo usaste la IA para resolver problemas, como el error de Firebase o el aislamiento de los Mocks en Vitest. ¡Esta parte es tu reflexión personal!)*

* **Estrategia de Uso:** ...
* **Ejemplos de Prompts utilizados:** ...
* **Reflexión técnica y análisis de código:** ...