
Web App para la gestión diaria principal del trabajo que se realiza diaria y semanalmente en la empresa en la que trabajo actualmente. Las funciones principales de uso están desarrolladas y actualmente sería de gran ayuda si llegara a implementarse.

Frontend realizado en HTML5, SASS y JavaScript con React y Redux, deployado en Amazon Web Services.

https://main.d2if9d9z0lsipr.amplifyapp.com/

Backend realizado en PHP con Laravel, deployado en Heroku.

El backend está desarrollado con las rutas necesarias para que esta web app pueda seguir desarrollándose hasta su objetivo final en cuanto a funcionalidades.
Se queda sin desarrollar en frontend:
- Creación de VANs
- Itemización de Vehículo a VANS
- Calendario de disponibilidad de los usuarios
- Calendario de disponibilidad para las jornadas con información adquirida de las demás tablas.

La app permite crear una base de datos con CRUDS completos y visualización de las distintas tablas a través de distintos filtros: usuarios (en registro) estadios, equipos, inventario y actualización de jornadas.

El registro y el login da acceso a la visualización de las distintas vistas y solo siendo admin se accede a la gestión para modificar, añadir, borrar y/o archivar.

La app está desarrollada para que después de la creación básica de algunos modelos se complete el perfil más adelante (es muy común en la empresa no disponer de toda la información necesaria de cada elemento).

Para acceder a los controles de gestión el admin debe pulsar encima de los elementos para que aparezcan los botones de acceso, además de información completa del elemento.

En el caso de no ser admin solo se muestra la información completa.