# attendance-node
An LTI tool for taking attendance.

## Get Started
`npm install` each time package.json changes so that linting and typescript checking will work in VSCode

`docker-compose up --build` to run the server.

Navigate your browser to [http://localhost/graphql] to use the GraphQL Playground.

## Code Organization
### Data Type Modules
* Each data type should have its own module, generally containing:
  * A `.resolver.ts` file that implements the GraphQL protocol, utilizing the services to:
    * Specify input parameters
    * Route queries to appropriate services
    * Catch and re-format error messages received from services
    * Resolvers do NOT concern themselves with authorization, as that should be shared with other protocols such as REST.
  * A `.models.ts` file that defines the types being accepted and returned by the resolvers.
    * The model should not have any business logic except for the primary model's constructor which translates from a passed-in database row.
  * A `.service.ts` file that uses the database.ts functions to retrieving data, while also applying:
    * Dataloading
    * Caching (if desired)
    * Authorization
  * A `.database.ts` file that exports functions strictly to translate `filter` objects into SQL and retrieve the corresponding items from the database.

### DataloaderFactory Module
The `DataLoaderFactory` module provides code shared by all data type modules. Its service is request-scoped, which will cascade up and make all data type services and resolvers request-scoped as well. This means that each request has its own instance of DataLoaderFactory, and all the caching that goes along with that.

Each data type service needs to `extends DataLoadedService` and then they will get the `.factory` and `.ctx` properties needed for performing request-scoped operations. See the `UserAttendances` module for an example.
