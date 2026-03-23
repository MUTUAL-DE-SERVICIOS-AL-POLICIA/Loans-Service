# Loans-Service

## Descripción

**Loans-Service** es un microservicio especializado que gestiona la información de préstamos y créditos otorgados a los afiliados policías de la plataforma. Administra todo el ciclo de vida de los préstamos, desde la solicitud inicial hasta la liquidación total, incluyendo el cálculo de intereses, gestión de cuotas y registro de pagos. Forma parte de una arquitectura de microservicios basada en **NestJS** y utiliza **NATS** para la comunicación asincrónica entre servicios.

Maneja datos como:
- Solicitudes de préstamos y evaluación de crédito
- Gestión de saldos y cuotas de pago
- Cálculo de intereses y tasas aplicables
- Historial de transacciones y movimientos de préstamos
- Amortizaciones y pagos realizados
- Estados de préstamo (activo, vencido, liquidado)

---

## Estructura del Proyecto

```
src/
├── app.module.ts                 # Módulo raíz que organiza todos los módulos de la aplicación
├── main.ts                       # Punto de entrada principal de la aplicación
├── loans/                        # Módulo principal de gestión de préstamos
│   ├── controllers/              # Controladores que manejan préstamos
│   ├── services/                 # Servicios con la lógica de préstamos
│   └── dto/                      # Data Transfer Objects para validación de datos
├── credit-evaluation/            # Módulo de evaluación y aprobación de crédito
│   ├── controllers/              # Controladores de solicitudes
│   ├── services/                 # Servicios de análisis de crédito
│   └── dto/                      # Validación de evaluación de crédito
├── payments/                     # Módulo de gestión de pagos y cuotas
│   ├── controllers/              # Controladores de pagos
│   ├── services/                 # Servicios de procesamiento de cuotas
│   └── dto/                      # Validación de datos de pagos
├── interest-calculation/         # Módulo de cálculo de intereses
│   ├── services/                 # Servicios de fórmulas y tasas
│   └── dto/                      # Validación de parámetros de cálculo
├── common/                       # Código compartido reutilizable en toda la aplicación
│   ├── filters/                  # Filtros para manejo de excepciones
│   ├── guards/                   # Guards para proteger rutas
│   └── decorators/               # Decoradores personalizados
├── config/                       # Archivos de configuración (BD, variables ENV, etc)
│   └── database.config.ts        # Configuración específica de PostgreSQL
├── database/                     # Gestión de base de datos, migraciones y datos iniciales
│   ├── migrations/               # Migraciones TypeORM para cambios en el esquema BD
│   ├── seeds/                    # Seeders para llenar BD con datos de prueba
│   └── entities/                 # Entidades (modelos) que representan tablas de la BD
```

---

## Clonar el repositorio y agregarle un nombre nuevo del nuevo proyecto

```bash
git clone https://github.com/MUTUAL-DE-SERVICIOS-AL-POLICIA/Loans-Service.git nombre-loans-service
```

## Inicializar proyecto

```bash
# Entrar al repositorio clonado con el nuevo nombre del proyecto
cd nombre-loans-service

# Elimina el origen remoto actual
git remote remove origin

# Crear el archivo .env en base al .env.template
cp .env.template .env

# Instalar las dependencias
pnpm install

# Correr proyecto en modo desarrollo
pnpm start:dev

# Crear nuevo Módulo
nest g res nombreModulo

# Crear un seeder
pnpm seed:create --name src/database/seeds/nombre_seed.ts

# Correr seeder
pnpm seed:run --name src/database/seeds/{code}-nombre_seed.ts

# Crear migración
pnpm typeorm migration:create src/database/migrations/NombreDeLaMigración

# Correr migración
pnpm migration:run

# Revertir migración
pnpm migration:revert

# Ver estado de migraciones
pnpm migration:show

# Para enlazar a un nuevo repositorio
git remote add origin https://github.com/tu-usuario/{nombre-loans-service}.git
git add .
git commit -m "Inicialización del nuevo proyecto"
git branch -M main
git push -u origin main
```