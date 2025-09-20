name: "🐛 Reporte de Error"
about: Ayúdanos a cuidar y mejorar este espacio reportando problemas o errores que encuentres.
title: "BUG: [Describe el error brevemente]"
labels: "bug"
assignees: ""

body:
  - type: markdown
    attributes:
      value: |
        ## Describe el error
        Una descripción clara y amable de cuál es el problema que encontraste. Cuéntanos con tus palabras, para que podamos entenderlo y solucionarlo juntas.

  - type: input
    id: error-description
    attributes:
      label: "Describe el error"
      placeholder: "Por ejemplo: el enlace de la palabra 'equidad' no lleva a ninguna parte."
      required: true

  - type: markdown
    attributes:
      value: |
        ## Para reproducir
        Pasos para reproducir el comportamiento que observaste:

  - type: textarea
    id: steps-to-reproduce
    attributes:
      label: "Pasos"
      description: |
        Ve a '...'

        Haz clic en '....'

        Navega hacia abajo hasta '....'

        Observa el error
      placeholder: "Escribe los pasos exactos para que podamos ver el error también."
      required: true

  - type: markdown
    attributes:
      value: |
        ## Comportamiento esperado
        Describe de manera clara y concisa lo que esperabas que sucediera, para que podamos entender la diferencia y mejorar la experiencia.

  - type: input
    id: expected-behavior
    attributes:
      label: "Comportamiento esperado"
      placeholder: "Por ejemplo: el enlace debería llevar al término correspondiente del glosario."
      required: true

  - type: markdown
    attributes:
      value: |
        ## Capturas de pantalla
        Si es posible, añade capturas que nos ayuden a visualizar el problema.

  - type: input
    id: screenshots
    attributes:
      label: "Capturas de pantalla"
      placeholder: "Enlace a imagen o adjunta archivo aquí (si GitHub permite)."

  - type: markdown
    attributes:

