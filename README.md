#  E-commerce Tienda Online

Un proyecto de carrito de compras interactivo y dinámico, construido desde cero para demostrar el manejo del DOM, asincronía y almacenamiento en el navegador. 

## Demo en Vivo
Puedes ver el proyecto funcionando aquí: https://squicciarinilautaro.github.io/proyecto-eccomerce-JS/

##  Funcionalidades Destacadas

* **Catálogo Dinámico:** Los productos se cargan de forma asíncrona simulando una base de datos a través de un archivo JSON usando `fetch`.
* **Gestión del Carrito:** Permite agregar productos, incrementar/decrementar cantidades y eliminar ítems específicos.
* **Control de Stock:** Sistema de validación (cláusula de guarda) que impide agregar más productos de los disponibles en el inventario.
* **Persistencia de Datos:** El carrito guarda su estado en el `localStorage`, por lo que los productos no se pierden al recargar la página.
* **Alertas Personalizadas:** Integración con la librería SweetAlert2 para brindar una mejor experiencia de usuario (UX) al agregar productos, alcanzar límites de stock o finalizar la compra.

##  Tecnologías Utilizadas

* **JavaScript (Vanilla):** Lógica pura, métodos de array avanzados (`.map()`, `.filter()`, `.reduce()`, `.find()`), promesas y manipulación del DOM.
* **HTML5:** Estructura semántica.
* **CSS3:** Diseño responsivo, minimalista y limpio, sin depender de frameworks externos.

##  Lo que aprendí en este proyecto

Este proyecto me ayudó a consolidar mi entendimiento sobre cómo conectar el frontend con datos externos (simulando una API) y cómo manejar la lógica matemática detrás de un carrito de compras interactivo, priorizando siempre un código limpio y buenas prácticas como evitar el anidamiento excesivo de condicionales.
