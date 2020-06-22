![Test Coverage-shield-badge-1](https://img.shields.io/badge/Test%20Coverage-98.08%25-brightgreen.svg)

# DI - Dependency Injection

__Work in progress__ - Not available on npm yet.

A very simple & lean dependency injection container for Typescript.

## Key features

* __Decorator to Inject services__
* __Light weight & simple to use__
* __No dependencies__

# How to use

1. Install the module

``npm install @thenja/di --save``

2. Import and use the module

```typescript
import { DI, IDIProvider } from '@thenja/di';

// our singleton service
class UtilityService {}

class User {
  @DI.Inject(UtilityService)
  private utilSrv: UtilityService;
}
```

## Examples

### Inject using a factory

```typescript
import { DI, IDIProvider } from '@thenja/di';

let env = 'dev';

abstract class BaseStorageService {
  abstract name: string;
}
class FileStorageService extends BaseStorageService {
  name = 'file-storage';
}
class MemoryStorageService extends BaseStorageService {
  name = 'memory-storage';
}

const storageFactory: IDIProvider = {
  provide: BaseStorageService,
  useFactory: () => {
    if (env === 'dev') return new MemoryStorageService();
    return new FileStorageService();
  }
};

class MyTest {
  @DI.Inject(storageFactory)
  public storageSrv: BaseStorageService;
}
```

### Inject using a different class

```typescript
import { DI, IDIProvider } from '@thenja/di';

class UserModel { name = 'user'; }
class MockUserModel { name = 'mock-user'; }

const userProvider: IDIProvider = {
  provide: UserModel,
  useClass: MockUserModel
};

class MyTest {
  @DI.Inject(userProvider)
  public user: UserModel;
}
```

### Dealing with models

Models are usually not singletons, however, we should still use dependency injection via the factory pattern to create the new model instances.

```typescript
// BAD

class UserSettingsModel {}

class UserModel {
  private settings: UserSettingsModel;

  constructor() {
    // makes it hard to mock settings, we should be using dependency injection
    this.settings = new UserSettingsModel();
  }
}

// BETTER

class UserSettingsModel {}

class UserModel {
  constructor(private settings: UserSettingsModel) {}
}

class UserModelFactory {
  create(): UserModel {
    return new UserModel(new UserSettingsModel());
  }
}

class UserService {
  @DI.Inject(UserModelFactory)
  private userModelFactory: UserModelFactory;

  getUser(): UserModel {
    // we can now mock the UserModelFactory
    return this.userModelFactory.create();
  }
}
```

# Methods / API

### @DI.Inject(service: any|IDIProvider)

Inject a singleton service into a class. You can either pass in a class object, or a IDIProvider object (see examples above).

### @DI.override(service: any|IDIProvider, dependencyInstance: any)

Override a service. Useful for mocking services.

### @DI.getService(service: any|IDIProvider): any

Get the service instance that is stored inside the dependency container.

### @DI.clear()

Clear the dependency container.

### @DI.getContainer(): { [key: string]: any }

Get the dependency container. Basically, the container is a json object with the key being the name of the service (randomly generated) and the value being the instance of the service.

### @DI.getContainerName(service: any|IDIProvider): string

Get the name used in the dependency container for a particular service.

# Development

``npm run init`` - Setup the app for development (run once after cloning)

``npm run dev`` - Run this command when you want to work on this app. It will
compile typescript, run tests and watch for file changes.

## Distribution

``npm run build -- -v <version>`` - Create a distribution build of the app.

__-v (version)__ - _[Optional]_ Either "patch", "minor" or "major". Increase
the version number in the package.json file.

The build command creates a _/compiled_ directory which has all the javascript
compiled code and typescript definitions. As well, a _/dist_ directory is 
created that contains a minified javascript file.

## Testing

_Tests are automatically ran when you do a build._

``npm run test`` - Run the tests. The tests will be ran in a nodejs environment.
You can run the tests in a browser environment by opening the file 
_/spec/in-browser/SpecRunner.html_.

## License

MIT © [Nathan Anderson](https://github.com/nathan-andosen)