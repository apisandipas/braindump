# Notes App

## Server

- Todo

  - ~~Remove webpack for using babel directly~~
  - ~~Refactor project structure into modules using merge-graphql-schemas~~
  - ~~Refactor Models to use bookshelf-model-base~~
  - ~~Add Joi validation to models~~
  - ~~Switch to apollo-server-express~~
  - ~~add models to context object~~
  - Add Users
    - ~~Graphql Type, Queries and Mutations~~
    - ~~Model, Seed, Migration, Relations and Validations~~
    - ~~CRUD Resolvers~~
    - ~~Add registration flow for Users w/ proper password hashing~~
    - Resolve user via JWT in header
  - Add Notes
    - ~~Graphql Type, Queries and Mutations~~
    - ~~Model, Seed, Migration, Relations and Validations~~
    - ~~CRUD Resolvers~~
  - Add Notebooks
    - ~~Graphql Type, Queries and Mutations~~
    - ~~Model, Seed, Migration, Relations and Validations~~
    - ~~CRUD Resolvers~~
  - Add Tags
    - Graphql Type, Queries and Mutations
    - Model, Seed, Migration, Relations and Validations
    - CRUD Resolvers
  - Better error handling
    - ~~Better client-consumable errors~~
      - ~~Joi validation errors~~
      - ~~App level errors~~
    - Rollbar or similar service

## Client

- Todo
  - Design client.
    - Figma?
    - Dark theme based on Arc-Dark
  - Plan app architecture
    - Apollo-client
    - React w hooks only
  - Setup react-router-dom
  - Setup styled-components.
    - ThemeProvider
    - Bootstrap Styled
  - Setup loadable-components
