# Loans-Service

## Descripción

## Descripción

**Loans-Service** es un microservicio que gestiona la información de préstamos y créditos otorgados a los afiliados policías de la plataforma. Administra todo el ciclo de vida de los préstamos, desde la solicitud inicial hasta la liquidación total, incluyendo el cálculo de intereses, gestión de cuotas y registro de pagos.

Maneja datos como:
- Solicitudes de préstamos y evaluación de crédito
- Gestión de saldos y cuotas de pago
- Cálculo de intereses y tasas aplicables
- Historial de transacciones y movimientos de préstamos
- Amortizaciones y pagos realizados
- Estados de préstamo (activo, vencido, liquidado)


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