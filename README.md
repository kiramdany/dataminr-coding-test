Example app for `Nodejs_Coding_Test.pdf`

### Dependencies

- node/npm
- docker/docker-compose

### Running locally

```sh
npm i
npm db
npm start #In separate shell tab

```

### Structural overview

- [postgress image](https://hub.docker.com/_/postgres) to setup db
- This automatically runs scripts in `/docker-entrypoint-initdb.d` of the docker container and as such `app/schema/schema.sql` is volume mounted to init the schema
- Serverless to run the application, config borrowed heavily from [serverless example:aws-node-rest-api-typescript](https://github.com/serverless/examples/tree/master/aws-node-rest-api-typescript) and [serverless example:aws-node-express-api](https://github.com/serverless/examples/tree/master/aws-node-express-api)
- Within app folder I've tried to keep things fairly simple, services are split between `tasks` and `tasklists` which each have a router, service and repository
- Realistically those two would actually be part of the same service as they are inherently coupled both at the domain and db level. However I split them out as they're already quite dense and to give an idea of how I typically like to organise things
- Typically I would also have something acting as a 'controller' between the router and the 'service' however in this example without authorization, logging, validation etc middleware the distinction between a router and controller is a little redundant
- [`node-postgres`](https://node-postgres.com/) for the postgres client within the repository files just using raw parametrised queries
- `app/models.ts` defines the types/models for the domain, db (entities) and requests (DTOs, an aggregate of url params, query and post body). This is top level just because tasks and tasklists were separated, typically would be defined in the appropriate service, by service I mean something that encapsulates domain area such as products or orders. I haven't included the concept of view models as for simplicity the api just returns the domain models unchanged however when the concept of permissions is introduced this becomes important, for example paid users may have access to extra fields
- There is of course a lot missing, validation being a big one but it gives a decent general idea of what an app like this could look like

### Tests

Initially bootstrapped off the spec runner of [Todo-Backend API](https://todobackend.com/specs/index.html?http://localhost:3000) which tests the tasks portion of the app
Those routes are now nested under 'tasks' however the above test suite can still be run uncommenting line 10 in `app/app.ts`

For the tasklists portion of the app
`app/tasklists/routes.test.ts` somewhat act as e2e tests and were implemented more as a way to help me develop as I went.

```
npm test
```

That will wipe the db and reinit the schema and then run the tests

Typically I'd mock the data layer for this type of test to be able to just test the business logic
As it is at the moment it's necessary that the tests are run serially as each one progresses off the next. Of course this is not ideal as tests should be independent. In a real world scenario I would

- Have this test as an e2e test in addition to a unit/integration test for these routes
- Create a separate db container for the tests on a different port
- Add seed data for these tests to more easily setup independent tests
- Use a .env file to share vars for test and serverless and to more consistenly change these for the different environments
