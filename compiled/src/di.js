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
var isProvider = function (obj) {
    return (obj.constructor === {}.constructor
        && obj.provide && (obj.useFactory || obj.useClass));
};
var addServiceToContainerFromProvider = function (provider) {
    if (!provider.provide.diContainerName) {
        addContainerName(provider.provide);
    }
    var containerName = provider.provide.diContainerName;
    if (!dependencyContainer[containerName]) {
        dependencyContainer[containerName] = (provider.useClass)
            ? new provider.useClass() : provider.useFactory();
    }
    return containerName;
};
var addServiceToContainer = function (service) {
    if (!service.diContainerName)
        addContainerName(service);
    if (!dependencyContainer[service.diContainerName]) {
        dependencyContainer[service.diContainerName] = new service();
    }
    return service.diContainerName;
};
var DI = (function () {
    function DI() {
    }
    DI.Inject = function (service) {
        return function (target, propName) {
            Object.defineProperty(target, propName, {
                get: function () {
                    if (!service) {
                        throw new Error('Inject() error, injected service not set');
                    }
                    var containerName = (isProvider(service))
                        ? addServiceToContainerFromProvider(service)
                        : addServiceToContainer(service);
                    return dependencyContainer[containerName];
                }
            });
        };
    };
    DI.override = function (service, dependencyInstance) {
        var containerName = (isProvider(service))
            ? addServiceToContainerFromProvider(service)
            : addServiceToContainer(service);
        dependencyContainer[containerName] = dependencyInstance;
    };
    DI.getService = function (service) {
        return (isProvider(service))
            ? dependencyContainer[addServiceToContainerFromProvider(service)]
            : dependencyContainer[addServiceToContainer(service)];
    };
    DI.clear = function () {
        dependencyContainer = {};
    };
    DI.getContainer = function () {
        return dependencyContainer;
    };
    DI.getContainerName = function (service) {
        return (isProvider(service)) ? addServiceToContainerFromProvider(service)
            : addServiceToContainer(service);
    };
    return DI;
}());
exports.DI = DI;
//# sourceMappingURL=di.js.map