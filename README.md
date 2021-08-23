
Web App para la gestión diaria del trabajo que se realiza en HawkEye Innovations España.

Frontend realizado en HTML5, SASS y JavaScript con React y Redux
Backend realizado en PHP con Laravel

//Usuarios - Funciones:
- Registro de usuario
- Login de usuario
- Modificación del perfil
Funciones Admin:
- Modificación de perfiles
- Listado de todos los usuarios
- Búsqueda por nombre de usuario
- Búsqueda de usuarios activos
- Búsqueda de usuarios archivados

- Registro de usuarios, login y modificación del perfil.
** Falta añadir en Backend al modelo, isArchive, ruta: findarchiveusers y findbyrole

En backend cambiar userSelector where to find y eliminar el get
Añadir opcion a busqueda por archive users.


//GWupdates - Funciones Admin
- Creación del Game Week Update semanal (GWU)
- Listado de GWUs
- Modificación de GWU
- Eliminación de GWU - Testear

** Falla el delete
 - Update, cambiado el nombre de la variable de gwupdate_id a id, hay que cambiar en backend y en front ya está cambiado

//Assets
- Registro de assets
- Listado de assets
- Modificación de assets
- 

** Error 401 para la creación del asset, cambiar en el controlador el request type a simplemente id.

// Jornadas
** Creacion de jornadas, equipos para la jornada, empleados para la jornada, van para la jornada.

// Inventario, garantías

A falta de implementar.

- Componente escalable y automático de generación de vistas para creación, listado y modificación. Usaría arrays predefinidos con los valores de las tablas a poder rellenar, modificar y listar (filtros incluídos), sin tener que volver a repetir para cada vista toda la estructura completa.

