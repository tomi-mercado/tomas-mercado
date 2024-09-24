---
slug: pull-request-description-with-commits
title: Acelera tus descripciones de pull request con tus commits
description: Un pequeño truco para usar tus commits como base de una descripción de pull request
locale: es
date: 2024-08-23
---

# Acelera tus descripciones de pull request con tus commits

Cuando estás trabajando en una nueva funcionalidad o en una corrección de bugs, normalmente creas una branch, haces algunos cambios y luego creas un pull request. La descripción del pull request es una parte crucial del workflow. Debe explicar cuáles son los cambios, por qué son necesarios y cómo se implementaron.

Escribir una buena descripción de pull request puede llevar tiempo, especialmente si has hecho muchos cambios. Pero hay un pequeño truco que puede ayudarte a acelerar este proceso: usar tus commits como base para la descripción del pull request.

Cuando tienes un flujo de trabajo ya bien implementado, tus commits probablemente se vean así:

```
feat(MyComponent): add a new feature to register users
fix(MyOtherComponent): fix a bug that was causing the app to crash when the user tried to login
```

Cada mensaje de commit es una pequeña descripción de lo que se hizo. Puedes usar estos mensajes como base para tu descripción de pull request. Puedes copiarlos directamente o usarlos como punto de partida para escribir una descripción más detallada.

Puedes usar el siguiente script para generar una descripción de pull request basada en tus commits:

```bash
git log main..HEAD --pretty=format:%s --reverse | pbcopy
```

Cambia `main` por la branch con la que quieres comparar tu branch actual. Este script copiará los mensajes de commit a tu portapapeles. Luego puedes pegarlos en la descripción del pull request.
