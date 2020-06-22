// Our dependency container that holds all our dependencies
let dependencyContainer = {};

export interface IDIProvider {
  provide: any;
  useFactory?: () => any;
  useClass?: any;
}


/**
 * Generate a random string
 *
 * @returns {string}
 */
const generateId = (): string => {
  return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5))
    .toUpperCase();
};


/**
 * Add a container name to the target class / service
 *
 * @param {*} target
 */
const addContainerName = (target: any) => {
  target.diContainerName = target.name + generateId();
};


/**
 * Determine if the object is a provider json object
 *
 * @param {*} obj
 * @returns
 */
const isProvider = (obj: any) => {
  return (obj.constructor === {}.constructor
  && obj.provide && (obj.useFactory || obj.useClass));
};


/**
 * Add the service from a provider to the dependency container
 *
 * @param {IDIProvider} provider
 * @returns {string}
 */
const addServiceToContainerFromProvider = (provider: IDIProvider): string => {
  if (!provider.provide.diContainerName) addContainerName(provider.provide);
  const containerName = provider.provide.diContainerName;
  if (!dependencyContainer[containerName]) {
    dependencyContainer[containerName] = (provider.useClass)
    ? new provider.useClass() : provider.useFactory();
  }
  return containerName;
};


/**
 * Add the service to the dependency container
 *
 * @param {*} service
 * @returns {string}
 */
const addServiceToContainer = (service: any): string => {
  if (!service.diContainerName) addContainerName(service);
  if (!dependencyContainer[service.diContainerName]) {
    dependencyContainer[service.diContainerName] = new service();
  }
  return service.diContainerName;
};


/**
 * Simple class to handle dependency injection
 *
 * @export
 * @class DI
 */
export class DI {

  /**
   * Inject Decorator: Inject a singleton instance of a service
   *
   * @export
   * @param {*} service
   * @returns
   */
  static Inject(service: any|IDIProvider) {
    return (target: any, propName: string): any => {
      Object.defineProperty(target, propName, {
        get: () => {
          if (!service) {
            throw new Error('Inject() error, injected service not set');
          }
          const containerName = (isProvider(service))
            ? addServiceToContainerFromProvider(service)
            : addServiceToContainer(service);
          return dependencyContainer[containerName];
        }
      });
    };
  }


  /**
   * Set / Override a dependency. Useful when running unit tests
   *
   * @export
   * @param {string} serviceName
   * @param {*} dependencyInstance
   */
  static override(service: any|IDIProvider, dependencyInstance: any) {
    const containerName = (isProvider(service))
      ? addServiceToContainerFromProvider(service)
      : addServiceToContainer(service);
    dependencyContainer[containerName] = dependencyInstance;
  }


  /**
   * Get a service, if it does not exist already, we create one
   *
   * @export
   * @param {*} service
   * @returns {*}
   */
  static getService(service: any|IDIProvider): any {
    return (isProvider(service))
      ? dependencyContainer[addServiceToContainerFromProvider(service)]
      : dependencyContainer[addServiceToContainer(service)];
  }


  /**
   * Clear all dependencies
   *
   * @static
   * @memberof DI
   */
  static clear() {
    dependencyContainer = {};
  }


  /**
   * Get the container that holds all the dependencies
   *
   * @static
   * @returns {*}
   * @memberof DI
   */
  static getContainer(): any {
    return dependencyContainer;
  }


  /**
   * Get the name used in the container for a service
   *
   * @static
   * @param {(any|IDIProvider)} service
   * @returns {string}
   * @memberof DI
   */
  static getContainerName(service: any|IDIProvider): string {
    return (isProvider(service)) ? addServiceToContainerFromProvider(service)
      : addServiceToContainer(service);
  }
}
