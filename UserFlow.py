from plantuml import PlantUML

# URL local o del servidor PlantUML. Puede ser local si tienes plantuml.jar y Graphviz
plantuml = PlantUML(url='http://www.plantuml.com/plantuml/img/')

# Escribe el diagrama en un archivo temporal
diagram_code = """
@startuml
title Flujo de Usuario - Tienda Online

start

:Registrarse / Iniciar sesión;
if (¿Tiene cuenta?) then (Sí)
  :Iniciar sesión;
else (No)
  :Registrarse;
endif

:Ver productos;
repeat
  :Seleccionar producto;
  :Agregar al carrito;
repeat while (¿Seguir comprando?)

:Revisar carrito;
if (¿Confirmar compra?) then (Sí)
  :Crear orden (orders);
  :Crear ítems de orden (order_items);
  :Cambiar estado a Pendiente;
else (No)
  :Seguir navegando;
endif

:Ver historial de pedidos;
stop
@enduml
"""

# Guardar en archivo
with open("flujo_usuario.puml", "w") as f:
    f.write(diagram_code)

# Generar imagen PNG
plantuml.processes_file("flujo_usuario.puml")
print("Diagrama generado como PNG")
