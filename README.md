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
* `ejemplo 01:` para la implementación de nuevas funcionalidades (*Agrega serverless function de AWS SES*).
* `ejemplo 02:` para la resolución con Firebase/Vercel (*CRUD y Persistencia por Usuario (Firestore)*).

---


## 🤖 Uso Crítico y Responsable de IA

Durante el desarrollo de la aplicación, la integración de Inteligencia Artificial se gestionó bajo un enfoque analítico y estructurado, priorizando siempre la fundamentación teórica y la auditoría manual del código resultante.

### Estrategia de Uso y Flujo de Trabajo
Mi metodología de trabajo con la IA (tanto con modelos de lenguaje conversacionales como con el asistente Antigravity IDE) se dividió en tres fases técnicas:

1. **Levantamiento de Requerimientos y Fundamentación Teórica:** El proceso comenzaba con el estudio de la base teórica proporcionada en la formación. A partir de allí, definía manualmente las especificaciones técnicas de cada módulo (por ejemplo, el ciclo de vida del componente `Login`, la gestión del estado global vs. local mediante `useState`, el control de efectos secundarios y suscripciones con `useEffect`, las redirecciones asíncronas, y el sistema de notificaciones).
2. **Sistematización y Prompt Engineering:** En lugar de delegar la lógica, utilizaba la IA conversacional para organizar mis abstracciones. Le proporcionaba mis requerimientos técnicos detallados y le solicitaba que estructurara un *System Prompt* de alta precisión, optimizado específicamente para el motor de Antigravity IDE.
3. **Generación y Auditoría de Código Estático:** Una vez que Antigravity procesaba el prompt y generaba la estructura del código, mi rol pasaba a ser estrictamente de revisión. Analizaba detalle por detalle la sintaxis, asegurando que el manejo de dependencias en los hooks y la integración de servicios (como Firebase) cumplieran con las buenas prácticas establecidas en la arquitectura.

### Ejemplo 01: Flujo de Trabajo(Login)

**Fase 1: Prompt enviado a la IA conversacional (Para estructurar ideas)**
Para ejemplificar el punto 2, este es el tipo de instrucción inicial que le proporcionaba a la IA para organizar mis ideas antes de codificar:

> "Basado en la teoría de React, necesito que me estructures un prompt técnico estricto para alimentar a Antigravity IDE. El objetivo es construir un componente de Login. Mis especificaciones son: 
> 1. Uso de `useState` para control de formularios controlados (email/password). 
> 2. Uso de `useEffect` para interceptar errores de Firebase y disparar notificaciones reactivas, garantizando la limpieza del efecto. 
> 3. Implementación de redirección post-autenticación utilizando React Router. 
> Organiza estas ideas y genérame el prompt exacto que debe ejecutar el IDE."

**Fase 2: Prompt Técnico Resultante (Inyectado en Antigravity IDE)**
A continuación, se detalla el fragmento exacto del prompt de nivel de ingeniería que fue generado a partir de mis directivas manuales, el cual inyecté en el IDE para la construcción del módulo de autenticación:

```text
Actúa como un Ingeniero de Software Senior experto en React, TypeScript y Clean Architecture. Genera el componente funcional `LoginForm.tsx` bajo los siguientes lineamientos estrictos:

1. Arquitectura por Capas: Desacopla la lógica de presentación del estado global. Consume el contexto de autenticación a través del custom hook `useAuth()`.
2. Manejo de Formularios: Utiliza abstracción de estado mediante el custom hook genérico `useForm` para gestionar los componentes controlados de `email` y `password`, asegurando tipado estricto con TypeScript.
3. Control Reactivo de Efectos Secundarios: Implementa un `useEffect` aislado acoplado a un `useRef` para actuar como guardacantón (`isErrorDisplayed`). Este debe interceptar los cambios en el estado de error global emitido por el `AuthContext`, disparando de forma controlada la notificación asíncrona mediante `react-hot-toast` y ejecutando inmediatamente la función de limpieza `clearError()`.
4. Composición de UI Atómica: Reutiliza de forma obligatoria los componentes atómicos puros ya existentes en el ecosistema (`Input` y `Button`), inyectando las propiedades nativas correspondientes mediante desestructuración de props.
5. Flujo de Navegación: El componente debe recibir un callback `onSuccess` de la capa superior (`LoginPage`), delegando la ejecución imperativa de la redirección mediante la API de React Router a la página contenedora.

Genera código limpio, fuertemente tipado, sin comentarios redundantes y optimizado para evitar re-renders innecesarios.
```

### Ejemplo 02: Flujo de Trabajo (Módulo de Tareas)

**Fase 1: Prompt enviado a la IA conversacional (Para estructurar ideas)**
Para organizar la arquitectura del formulario de creación de tareas antes de programar, utilicé una instrucción similar a esta:

> "Basado en los principios de React, necesito estructurar un prompt técnico para Antigravity IDE. El objetivo es crear el componente `TodoForm`. Mis requisitos son: 
> 1. El componente debe ser 'tonto' (agnóstico), es decir, no debe comunicarse con Firebase. Solo debe recibir una función `onSubmit` por props.
> 2. Debe usar mi custom hook `useForm` para manejar el estado de título, descripción, prioridad, fecha y categoría.
> 3. Debe incluir lógica de validación (el título debe tener mínimo 3 caracteres, y la categoría y fecha son obligatorias). 
> Redacta el prompt exacto con lenguaje de ingeniería de software para inyectarlo en el IDE."

**Fase 2: Prompt Técnico Resultante (Inyectado en Antigravity IDE)**
A continuación, se detalla el fragmento exacto del prompt de nivel de ingeniería que la IA estructuró en base a mis directivas, el cual utilicé para autogenerar el módulo:

```text
Actúa como un Ingeniero de Software Senior experto en React, TypeScript y Clean Architecture. Genera el componente funcional `TodoForm.tsx` bajo los siguientes lineamientos estrictos:

1. Principio de Responsabilidad Única (SRP): El componente debe ser estrictamente de presentación. Desacopla la lógica de persistencia de datos. Debe recibir un prop `onSubmit` de tipo `(values: TaskFormValues) => void | Promise<void>` para delegar la inserción en la base de datos al componente contenedor (`DashboardPage`).
2. Abstracción de Estado de Formulario: Implementa el custom hook `useForm<TaskFormValues>` pasando los `initialValues` correspondientes.
3. Reglas de Validación de Negocio: Implementa la función `validate` dentro del hook. Debe retornar un objeto de errores si: el título está vacío o tiene menos de 3 caracteres, o si `dueDate` o `category` están vacíos.
4. Composición de Interfaz: Construye la vista utilizando exclusivamente los componentes atómicos del ecosistema (`Input`, `Select`, `Button`), mapeando correctamente los valores, handlers de cambio (`onChange`) y mensajes de error desde el hook.

Genera un código declarativo, fuertemente tipado mediante las interfaces globales de TypeScript y optimizado para su integración dentro de un `Modal`.
