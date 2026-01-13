# Sistema de Detenciones - Nablijven

Aplicación web para la gestión de detenciones escolares, replicando las funcionalidades del sistema Excel original.

## Características

- **Gestión de Estudiantes**: Administra listas de estudiantes por día (Lunes, Martes, Jueves)
- **Registro de Detenciones**: Crea y gestiona sesiones de detención con todos los campos necesarios:
  - Número de detención
  - Estudiante (selección de lista)
  - Profesor
  - Razón
  - Tarea asignada
  - Fecha LVS
  - Checkbox para imprimir
  - Checkbox para uso de chromebook
  - Observaciones adicionales
- **Calendario**: Visualiza todas las sesiones en un calendario mensual
- **Búsqueda**: Busca sesiones por estudiante, razón o profesor
- **Impresión**: Funcionalidad de impresión para sesiones marcadas

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## Estructura del Proyecto

- `/app` - Páginas y componentes de Next.js
- `/app/api` - Rutas API para gestionar datos
- `/lib` - Funciones de utilidad y gestión de datos
- `/types` - Definiciones de tipos TypeScript
- `/data` - Archivos JSON de almacenamiento (se crean automáticamente)

## Funcionalidades Principales

### Gestión de Estudiantes
- Agregar, editar y eliminar estudiantes
- Organización por día de la semana (Lunes, Martes, Jueves)
- Formato: "Nombre - Grado/Clase"

### Sesiones de Detención
- Crear nuevas sesiones con múltiples detenciones
- Seleccionar estudiantes de la lista del día correspondiente
- Marcar detenciones para impresión
- Gestionar permisos de chromebook
- Agregar observaciones adicionales

### Calendario
- Vista mensual de todas las sesiones
- Indicadores visuales para días con detenciones
- Navegación entre meses
- Acceso rápido a sesiones específicas

## Tecnologías Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **date-fns** - Manejo de fechas
- **lucide-react** - Iconos

## Notas

- Los datos se almacenan en archivos JSON en la carpeta `/data`
- El sistema replica todas las funcionalidades del Excel original
- Compatible con el formato de datos existente
