"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIBaseFactory = exports.DI = void 0;
var dependencyContainer = {};
var DI = (function () {
    function DI() {
    }
    DI.Singleton = function (serviceName) {
        return function (target) {
            if (!serviceName)
                throw new Error('Please enter a service name');
            target.diServiceName = serviceName;
        };
    };
    DI.Inject = function (service, serviceName) {
        return function (target, propName) {
            Object.defineProperty(target, propName, {
                get: function () {
                    var name = (serviceName) ? serviceName : (service.diServiceName)
                        ? service.diServiceName : service.name;
                    if (!dependencyContainer[name]) {
                        dependencyContainer[name] = new service();
                    }
                    return dependencyContainer[name];
                }
            });
        };
    };
    DI.InjectViaFactory = function (factory) {
        return function (target, propName) {
            Object.defineProperty(target, propName, {
                get: function () {
                    var name = factory.serviceName;
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
        var name = (serviceName) ? serviceName : (service.diServiceName)
            ? service.diServiceName : service.name;
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
var DIBaseFactory = (function () {
    function DIBaseFactory() {
    }
    return DIBaseFactory;
}());
exports.DIBaseFactory = DIBaseFactory;
//# sourceMappingURL=di.js.map