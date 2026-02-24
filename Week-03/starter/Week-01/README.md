## Sistema de Seguimiento de Paquetes
## Descripción
Este proyecto modela un sistema simple de seguimiento de paquetes usando TypeScript.
El objetivo es practicar la definición de entidades, tipos y funciones básicas para representar un dominio real.

## Dominio
Entidad principal: Package → representa un envío con peso, dimensiones, estado, destino y transportista.

Entidades relacionadas:

Address → define la dirección de origen o destino.

Carrier → representa la empresa o persona encargada del transporte.

## Funcionalidades
Crear nuevos paquetes (createPackage)

Listar todos los paquetes (listPackages)

Filtrar paquetes por estado (filterByStatus)

## Decisiones
ID como string: porque los códigos de rastreo reales suelen ser alfanuméricos (ejemplo: PKG001).

Type unions: usados para el estado del paquete (pending | in_transit | delivered | returned) y el tipo de transportista (company | independent).

Comentarios: escritos en español con formato QUÉ, PARA, IMPACTO para explicar cada parte del código.

## Ejecución
bash
pnpm install
pnpm start

## Checklist
[] Definí interfaces para las entidades principales

[] Usé type unions y literales

[] Implementé funciones tipadas para operaciones básicas

[] Probé el código con datos de ejemplo

[] El proyecto compila y se ejecuta sin errores