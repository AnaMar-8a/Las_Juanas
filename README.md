# 📖 Abecedario Político Interactivo — Escuela Las Juanas  
**Una herramienta digital feminista, pedagógica y multilingüe para nombrar, compartir y transformar.**

El **Abecedario Político Interactivo** es un glosario vivo: no solo entrega definiciones, sino que invita a la comunidad a **co-crear, aportar y resignificar** conceptos políticos desde el **Sur Global**.

---

## Contenidos
- [Novedades v4.0 — Voces Sin Fronteras](#-novedades-en-la-versión-40--voces-sin-fronteras)
- [Internacionalización (i18n)](#-internacionalización-i18n)
- [Arquitectura modular y políglota](#-arquitectura-modular-y-políglota)
- [El nuevo corazón: glossary.json](#-el-nuevo-corazón-glossaryjson)
- [Ecosistema de co-creación en GitHub](#-ecosistema-de-co-creación-en-github)
- [Rizomas en crecimiento](#-rizomas-en-crecimiento)
- [Botón de co-creación (WhatsApp)](#-botón-de-co-creación-whatsapp)
- [Concepto](#-concepto)
- [Recomendaciones para seguir creciendo](#-recomendaciones-para-seguir-creciendo)
- [Reflexión feminista sobre el código](#-reflexión-feminista-sobre-el-código)
- [Instalación y uso](#-instalación-y-uso)
- [Autoría](#-autoría)
- [Licencia](#-licencia)

---

## ✨ Novedades en la versión 4.0 — Voces Sin Fronteras

La versión **4.0** expande el alcance del proyecto para romper barreras del idioma y fortalecer el diálogo con compañeras de otras latitudes.  
El glosario ahora es **multilingüe**, **modular** y diseñado para crecer sin romper su estructura.

---

## 🌍 Internacionalización (i18n)

El glosario ahora habla:

- Español (**ES**)
- Inglés (**EN**)
- Portugués (**PT-BR**)

Además, se implementó un sistema de gestión de estado que:

- Permite cambiar el idioma **instantáneamente** desde la interfaz.
- Recuerda tu preferencia: guarda el idioma en `localStorage` para que la próxima vez te recibamos en tu lengua.
- Adapta dinámicamente toda la interfaz: títulos, placeholders y mensajes de bienvenida.

---

## 🏗️ Arquitectura Modular y Políglota

La estructura del proyecto se mantiene profesional y clara, pero el corazón de los datos creció:

- `index.html` → **Los Planos de la Casa**  
  Incluye selectores de idioma en escritorio y móvil.
- `assets/css/style.css` → **La Habitación del Diseño**  
  Estética visual cuidada y responsiva.
- `assets/js/script.js` → **La Sala de Máquinas**  
  Lógica para diccionarios de traducción y renderizado dinámico.
- `glossary.json` → **El Corazón del Glosario**  
  Reestructurado para soportar múltiples idiomas.

Ejemplo de árbol:

```txt
/
├─ index.html
├─ glossary.json
└─ assets/
   ├─ css/
   │  └─ style.css
   └─ js/
      └─ script.js
```

---

## 📚 El nuevo corazón: glossary.json

Antes, los términos eran planos. Ahora, cada entrada es un objeto multidimensional que alberga las tres lenguas, permitiendo que el contenido crezca sin romper la estructura.

Ejemplo de entrada:

```json
{
  "id": "a-abya-yala",
  "content": {
    "es": { "term": "Abya Yala", "definition": "..." },
    "en": { "term": "Abya Yala", "definition": "..." },
    "pt": { "term": "Abya Yala", "definition": "..." }
  }
}
```

---

## 🤝 Ecosistema de co-creación en GitHub

El repositorio funciona como un **territorio de colaboración**:

- `CONTRIBUTING.md` → Guía de contribución escrita desde el cuidado.
- Plantillas de Issues → Conversaciones amorosas para sembrar palabras o reportar errores.

---

## 🌱 Rizomas en Crecimiento

- Animación de fondo programada para crecer progresivamente.
- Los rizomas comienzan sutiles y expanden sus conexiones hasta cubrir la página.

Es una metáfora viva: el conocimiento feminista **crece en red y colectividad**, ahora también **a través de fronteras del lenguaje**.

---

## 💬 Botón de co-creación (WhatsApp)

- Botón flotante en el lateral derecho.
- Invita a la comunidad a sumar sus voces al glosario vivo.
- Mensaje predeterminado:

```txt
Hola, quisiera aportar al glosario vivo de Las Juanas
```

---

## 🌿 Concepto

El Abecedario Político es más que una lista de definiciones: es un **territorio digital de cuidado** donde cada palabra se siembra y florece colectivamente.

- **Lenguaje vivo:** definiciones con ejemplos cotidianos traducidos culturalmente.  
- **Cuidado estético:** tipografía orgánica, colores feministas, animaciones suaves.  
- **Memoria y colectividad:** autoría compartida, voces visibles, comunidad presente.  

---

## 🎨 Recomendaciones para seguir creciendo

### Tipografía
- **Inter** → texto base.
- **Fraunces / Crimson Pro / Domine** → títulos con aire editorial.
- Mínimo **18px en móviles**.

### Colores feministas y orgánicos
- Morado vibrante (acento): `#6d28d9`
- Tierra suave / verde salvia: `#9CA986`
- Rosa arcilla: `#E6A6A1`
- Fondos claros cálidos y degradados suaves.

### UX/UI inclusiva
- Contrastes accesibles + opción **“modo lectura simple”**.
- Navegación alfabética y selector de idioma accesible.
- Buscador inteligente que busca en el **idioma activo**.

### Lenguaje de cuidado en la interfaz
- “Volver al abrazo” en vez de “Inicio”.
- “Cuidar la vista” en vez de “Cerrar”.
- Funciones con nombres afectivos (ejemplo): `abrirCuidadoDeLaPalabra()`.

---

## 🌸 Reflexión Feminista sobre el Código

Este proyecto demuestra que programar también puede ser un gesto feminista:

- El fondo rizomático recuerda que el saber crece en red, no en jerarquía.
- La internacionalización es un acto de sororidad transnacional: puente con Brasil y el mundo angloparlante.
- Nombrar funciones con ternura politiza el lenguaje técnico.
- El botón de WhatsApp materializa la co-creación viva con la comunidad.

---

## 🚀 Instalación y uso

1) Clona el repositorio:

```bash
git clone https://github.com/AnaMar-8a/Las_Juanas.git
```

2) Abre `index.html` en tu navegador.  
Se recomienda usar **Live Server** o un servidor local para cargar el JSON correctamente.

3) Explora el glosario, cambia de idioma y aporta nuevas palabras:
- vía GitHub (issues / PRs)
- o con el botón de WhatsApp

---

## 👩‍💻 Autoría

- **Escuela de Formación Política Feminista Las Juanas** — Herramienta co-creada desde la escuela.
- **AnaMar8a** — Diseño y desarrollo.
- **Movimiento Electas, Instituto Update, Corporación Recuperando Identidad** — Aliadas en la co-creación.

---

## 💜 Licencia

Este proyecto es de uso libre bajo licencia **Creative Commons BY-SA 4.0**.  
Comparte, remezcla y expande, siempre reconociendo la autoría colectiva.
