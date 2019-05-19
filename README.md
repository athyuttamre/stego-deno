<img src=".github/stego.svg" width="80" alt="stego logo">

# stego

Stego is a web framework for the Deno runtime.

It hopes to let you build:

- Web servers
- Database models and migrations
- Queues of async tasks
- Simple front-ends, that can be optionally extended with frameworks such as React and Vue

It aims to be:

- Simple.
  - It has a minimal surface area and aims to be learnable in 5 minutes total.
- Opinionated.
  - It makes well-reasoned, clear decisions about everything that matters. You shouldn’t have to make a hundred decisions before building a web application.
- Strongly typed.
  - It is written in Typescript and runs in the Deno runtime.
- Functional.
  - It eschews mutation, inheritance, and decorators in favor of plain functions.
- Data-driven.
  - It optimizes for common use cases when working with data: creating and modifying individual models, lists of models, related data from other models, and intersections of models.
- Extensible with the language.
  - It has minimal dependencies, and provides simple interfaces that allow you to extend the core functionality simply with knowledge of Typescript, and nothing more.
