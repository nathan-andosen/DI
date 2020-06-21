// Our dependency container that holds all our dependencies
let dependencyContainer = {};


/**
 * Generate a random string
 *
 * @returns {string}
 */
const generateId = (): string => {
  return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5))
    .toUpperCase();
};


const addContainerName = (target: any) => {
  target.diContainerName = target.name + generateId();
};


/**
 * Simple class to handle dependency injection
 *
 * @export
 * @class DI
 */
export class DI {

  /**
   * All singleton services should apply this class decorator
   *
   * @static
   * @param {string} serviceName
   * @returns
   * @memberof DI
   */
  static Singleton(serviceName?: string) {
    return (target: any) => {
      if (serviceName) { target.diContainerName = serviceName; return; }
      addContainerName(target);
    };
  }


  /**
   * Inject Decorator: Inject a singleton instance of a service
   *
   * @export
   * @param {*} service
   * @param {string} [serviceName] If you are using minification, you may need
   *   to pass the service name as a string
   * @returns
   */
  static Inject(service: any, serviceName?: string) {
    return (target: any, propName: string): any => {
      Object.defineProperty(target, propName, {
        get: () => {
          if (serviceName && !service.diContainerName) {
            service.diContainerName = serviceName;
          }
          if (!service.diContainerName) addContainerName(service);
          if (!dependencyContainer[service.diContainerName]) {
            dependencyContainer[service.diContainerName] = new service();
          }
          return dependencyContainer[service.diContainerName];
        }
      });
    };
  }


  static InjectViaFactory(factory: IDIFactory) {
    return (target: any, propName: string): any => {
      Object.defineProperty(target, propName, {
        get: () => {
          if (!factory.provide) throw new Error('provide not set in factory');
          if (!factory.provide.diContainerName) {
            addContainerName(factory.provide);
          }
          const name: string = factory.provide.diContainerName;
          if (!dependencyContainer[name]) {
            dependencyContainer[name] = factory.create();
          }
          return dependencyContainer[name];
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
  static override(serviceName: string, dependencyInstance: any) {
    dependencyContainer[serviceName] = dependencyInstance;
  }


  /**
   * Get a service, if it does not exist already, we create one
   *
   * @export
   * @param {*} service
   * @param {string} [serviceName]
   * @returns {*}
   */
  static getService(service: any, serviceName?: string): any {
    const name = (serviceName) ? serviceName : (service.diContainerName)
    ? service.diContainerName : service.name;
    if (!dependencyContainer[name] && service) {
      dependencyContainer[name] = new service();
    }
    return dependencyContainer[name];
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
}


/**
 * Factories for creating services should extend this class
 *
 * @export
 * @abstract
 * @class DIBaseFactory
 */
// export abstract class DIBaseFactory {
//   abstract serviceName?: string;
//   abstract create(): any;
// }


export interface IDIFactory {
  provide: any;
  create: () => any;
}