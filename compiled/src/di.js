"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DI = void 0;
var dependencyContainer = {};
var generateId = function () {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5))
        .toUpperCase();
};
var addContainerName = function (target) {
    target.diContainerName = target.name + generateId();
};
var DI = (function () {
    function DI() {
    }
    DI.Singleton = function (serviceName) {
        return function (target) {
            if (serviceName) {
                target.diContainerName = serviceName;
                return;
            }
            addContainerName(target);
        };
    };
    DI.Inject = function (service, serviceName) {
        return function (target, propName) {
            Object.defineProperty(target, propName, {
                get: function () {
                    if (serviceName && !service.diContainerName) {
                        service.diContainerName = serviceName;
                    }
                    if (!service.diContainerName)
                        addContainerName(service);
                    if (!dependencyContainer[service.diContainerName]) {
                        dependencyContainer[service.diContainerName] = new service();
                    }
                    return dependencyContainer[service.diContainerName];
                }
            });
        };
    };
    DI.InjectViaFactory = function (factory) {
        return function (target, propName) {
            Object.defineProperty(target, propName, {
                get: function () {
                    if (!factory.provide)
                        throw new Error('provide not set in factory');
                    if (!factory.provide.diContainerName) {
                        addContainerName(factory.provide);
                    }
                    var name = factory.provide.diContainerName;
                    if (!dependencyContainer[name]) {
                        dependencyContainer[name] = factory.create();
                    }
                    return dependencyContainer[name];
                }
            });
        };
    };
    DI.override = function (serviceName, dependencyInstance) {
        dependencyContainer[serviceName] = dependencyInstance;
    };
    DI.getService = function (service, serviceName) {
        var name = (serviceName) ? serviceName : (service.diContainerName)
            ? service.diContainerName : service.name;
        if (!dependencyContainer[name] && service) {
            dependencyContainer[name] = new service();
        }
        return dependencyContainer[name];
    };
    DI.clear = function () {
        dependencyContainer = {};
    };
    DI.getContainer = function () {
        return dependencyContainer;
    };
    return DI;
}());
exports.DI = DI;
//# sourceMappingURL=di.js.map