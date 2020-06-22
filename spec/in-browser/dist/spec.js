/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./spec/in-browser/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./spec/in-browser/index.js":
/*!**********************************!*\
  !*** ./spec/in-browser/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


// Our webpack.unit.tests.config.js file uses this to require all unit test files
// so they can be tested in a browser for debugging

// require all test files
var testsContext = __webpack_require__("./spec/unit sync recursive .spec$");
testsContext.keys().forEach(testsContext);


/***/ }),

/***/ "./spec/unit sync recursive .spec$":
/*!*******************************!*\
  !*** ./spec/unit sync .spec$ ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./always.spec": "./spec/unit/always.spec.ts",
	"./di.spec": "./spec/unit/di.spec.ts"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./spec/unit sync recursive .spec$";

/***/ }),

/***/ "./spec/unit/always.spec.ts":
/*!**********************************!*\
  !*** ./spec/unit/always.spec.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

describe('Always have a spec', function () {
    it('should always have a spec test', function () {
        expect(true).toEqual(true);
    });
});


/***/ }),

/***/ "./spec/unit/di.spec.ts":
/*!******************************!*\
  !*** ./spec/unit/di.spec.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = __webpack_require__(/*! ../../src */ "./src/index.ts");
describe('DI:', function () {
    afterEach(function () {
        src_1.DI.clear();
    });
    describe('Inject()', function () {
        it('should inject dependency', function () {
            var UtilityService = (function () {
                function UtilityService() {
                }
                UtilityService.prototype.add = function (num1, num2) { return num1 + num2; };
                return UtilityService;
            }());
            var MyTest = (function () {
                function MyTest() {
                }
                MyTest.prototype.addNumbers = function (num1, num2) {
                    return this.utilitySrv.add(num1, num2);
                };
                __decorate([
                    src_1.DI.Inject(UtilityService),
                    __metadata("design:type", UtilityService)
                ], MyTest.prototype, "utilitySrv", void 0);
                return MyTest;
            }());
            var myTest = new MyTest();
            expect(myTest.addNumbers(2, 2)).toEqual(4);
        });
        it('should inject singleton', function () {
            var cnt = 0;
            var UtilityService = (function () {
                function UtilityService() {
                    cnt++;
                    this.name = 'util-' + cnt;
                }
                UtilityService.prototype.getName = function () { return this.name; };
                return UtilityService;
            }());
            var MyTest1 = (function () {
                function MyTest1() {
                }
                MyTest1.prototype.getName = function () {
                    return this.utilitySrv.getName();
                };
                __decorate([
                    src_1.DI.Inject(UtilityService),
                    __metadata("design:type", UtilityService)
                ], MyTest1.prototype, "utilitySrv", void 0);
                return MyTest1;
            }());
            var MyTest2 = (function () {
                function MyTest2() {
                }
                MyTest2.prototype.getName = function () {
                    return this.utilitySrv.getName();
                };
                __decorate([
                    src_1.DI.Inject(UtilityService),
                    __metadata("design:type", UtilityService)
                ], MyTest2.prototype, "utilitySrv", void 0);
                return MyTest2;
            }());
            expect(new MyTest1().getName()).toEqual('util-1');
            expect(new MyTest2().getName()).toEqual('util-1');
        });
        it('should throw error as no service set', function () {
            try {
                var UtilityService = (function () {
                    function UtilityService() {
                        this.name = 'util';
                    }
                    return UtilityService;
                }());
                var MyTest1 = (function () {
                    function MyTest1() {
                    }
                    __decorate([
                        src_1.DI.Inject(undefined),
                        __metadata("design:type", UtilityService)
                    ], MyTest1.prototype, "utilitySrv", void 0);
                    return MyTest1;
                }());
            }
            catch (e) {
                expect(e.message).toContain('Inject() error');
            }
        });
    });
    describe('Inject() - with provider', function () {
        it('should inject using factory', function () {
            var env = 'dev';
            var BaseStorageService = (function () {
                function BaseStorageService() {
                }
                return BaseStorageService;
            }());
            var FileStorageService = (function (_super) {
                __extends(FileStorageService, _super);
                function FileStorageService() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.name = 'file-storage';
                    return _this;
                }
                return FileStorageService;
            }(BaseStorageService));
            var MemoryStorageService = (function (_super) {
                __extends(MemoryStorageService, _super);
                function MemoryStorageService() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.name = 'memory-storage';
                    return _this;
                }
                return MemoryStorageService;
            }(BaseStorageService));
            var storageFactory = {
                provide: BaseStorageService,
                useFactory: function () {
                    if (env === 'dev')
                        return new MemoryStorageService();
                    return new FileStorageService();
                }
            };
            var MyTest = (function () {
                function MyTest() {
                }
                __decorate([
                    src_1.DI.Inject(storageFactory),
                    __metadata("design:type", BaseStorageService)
                ], MyTest.prototype, "storageSrv", void 0);
                return MyTest;
            }());
            var myTest = new MyTest();
            expect(myTest.storageSrv.name).toEqual('memory-storage');
            src_1.DI.clear();
            env = 'prod';
            var myTest2 = new MyTest();
            expect(myTest2.storageSrv.name).toEqual('file-storage');
        });
        it('should inject using factory as mock', function () {
            var UserModel = (function () {
                function UserModel() {
                    this.name = 'user';
                }
                return UserModel;
            }());
            var MockUserModel = (function () {
                function MockUserModel() {
                    this.name = 'mock-user';
                }
                return MockUserModel;
            }());
            var userProvider = {
                provide: UserModel,
                useClass: MockUserModel
            };
            var MyTest = (function () {
                function MyTest() {
                }
                __decorate([
                    src_1.DI.Inject(userProvider),
                    __metadata("design:type", UserModel)
                ], MyTest.prototype, "user", void 0);
                return MyTest;
            }());
            var myTest = new MyTest();
            expect(myTest.user.name).toEqual('mock-user');
        });
        it('should inject using factory with constructor parameters', function () {
            var Names = (function () {
                function Names() {
                    this.names = ['Nathan', 'David'];
                }
                return Names;
            }());
            var UtilityService = (function () {
                function UtilityService() {
                }
                UtilityService.prototype.addFullStop = function (str) {
                    return str + '.';
                };
                return UtilityService;
            }());
            var UserService = (function () {
                function UserService(name) {
                    this.name = name;
                }
                UserService.prototype.getName = function () {
                    return this.utilitySrv.addFullStop(this.name);
                };
                __decorate([
                    src_1.DI.Inject(UtilityService),
                    __metadata("design:type", UtilityService)
                ], UserService.prototype, "utilitySrv", void 0);
                return UserService;
            }());
            var userFactory = {
                provide: UserService,
                useFactory: function () {
                    var name = src_1.DI.getService(Names);
                    return new UserService(name.names[0]);
                }
            };
            var UserModel = (function () {
                function UserModel() {
                }
                __decorate([
                    src_1.DI.Inject(userFactory),
                    __metadata("design:type", UserService)
                ], UserModel.prototype, "userSrv", void 0);
                return UserModel;
            }());
            var user = new UserModel();
            expect(user.userSrv.getName()).toEqual('Nathan.');
        });
    });
    describe('override()', function () {
        it('should override dependency in the container', function () {
            var UtilityService = (function () {
                function UtilityService() {
                    this.name = 'util-1';
                }
                return UtilityService;
            }());
            var MyTest = (function () {
                function MyTest() {
                }
                __decorate([
                    src_1.DI.Inject(UtilityService),
                    __metadata("design:type", UtilityService)
                ], MyTest.prototype, "utilitySrv", void 0);
                return MyTest;
            }());
            var myTest = new MyTest();
            expect(myTest.utilitySrv.name).toEqual('util-1');
            var utilSrv = new UtilityService();
            utilSrv.name = 'util-2';
            src_1.DI.override(UtilityService, utilSrv);
            expect(myTest.utilitySrv.name).toEqual('util-2');
        });
        it('should override dependency via a provider', function () {
            var UserModel = (function () {
                function UserModel() {
                    this.name = 'user';
                }
                return UserModel;
            }());
            var MockUserModel = (function () {
                function MockUserModel() {
                    this.name = 'mock-user';
                }
                return MockUserModel;
            }());
            var userProvider = {
                provide: UserModel,
                useClass: MockUserModel
            };
            var MyTest = (function () {
                function MyTest() {
                }
                __decorate([
                    src_1.DI.Inject(userProvider),
                    __metadata("design:type", UserModel)
                ], MyTest.prototype, "user", void 0);
                return MyTest;
            }());
            var myTest = new MyTest();
            expect(myTest.user.name).toEqual('mock-user');
            var myTest2 = new MockUserModel();
            myTest2.name = 'mock-user-2';
            src_1.DI.override(userProvider, myTest2);
            expect(myTest.user.name).toEqual('mock-user-2');
            var containerName = src_1.DI.getContainerName(userProvider);
            var container = src_1.DI.getContainer();
            expect(container[containerName].name).toEqual('mock-user-2');
        });
    });
    describe('getService()', function () {
        it('should get service from container', function () {
            var UtilityService = (function () {
                function UtilityService() {
                    this.name = 'util-1';
                }
                return UtilityService;
            }());
            var MyTest = (function () {
                function MyTest() {
                }
                __decorate([
                    src_1.DI.Inject(UtilityService),
                    __metadata("design:type", UtilityService)
                ], MyTest.prototype, "utilitySrv", void 0);
                return MyTest;
            }());
            var myTest = new MyTest();
            expect(myTest.utilitySrv.name).toEqual('util-1');
            var srv = src_1.DI.getService(UtilityService);
            expect(srv.name).toEqual('util-1');
            src_1.DI.clear();
            var srv2 = src_1.DI.getService(UtilityService);
            expect(srv2.name).toEqual('util-1');
            var srv3 = src_1.DI.getService(UtilityService);
            expect(srv3.name).toEqual('util-1');
        });
        it('should get service via a provider', function () {
            var UserModel = (function () {
                function UserModel() {
                    this.name = 'user';
                }
                return UserModel;
            }());
            var MockUserModel = (function () {
                function MockUserModel() {
                    this.name = 'mock-user';
                }
                return MockUserModel;
            }());
            var userProvider = {
                provide: UserModel,
                useClass: MockUserModel
            };
            var MyTest = (function () {
                function MyTest() {
                }
                __decorate([
                    src_1.DI.Inject(userProvider),
                    __metadata("design:type", UserModel)
                ], MyTest.prototype, "user", void 0);
                return MyTest;
            }());
            var myTest = new MyTest();
            expect(myTest.user.name).toEqual('mock-user');
            var srv = src_1.DI.getService(userProvider);
            expect(srv.name).toEqual('mock-user');
        });
    });
    describe('clear()', function () {
        it('should clear all dependencies from container', function () {
            var UtilityService = (function () {
                function UtilityService() {
                    this.name = 'util-1';
                }
                return UtilityService;
            }());
            var MyTest = (function () {
                function MyTest() {
                }
                __decorate([
                    src_1.DI.Inject(UtilityService),
                    __metadata("design:type", UtilityService)
                ], MyTest.prototype, "utilitySrv", void 0);
                return MyTest;
            }());
            var myTest = new MyTest();
            expect(myTest.utilitySrv.name).toEqual('util-1');
            var containerName = src_1.DI.getContainerName(UtilityService);
            expect(src_1.DI.getContainer()[containerName]).toBeDefined();
            src_1.DI.clear();
            expect(Object.keys(src_1.DI.getContainer()).length).toBeLessThan(1);
        });
    });
});


/***/ }),

/***/ "./src/di.ts":
/*!*******************!*\
  !*** ./src/di.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
                    if (isProvider(service)) {
                        var containerName = addServiceToContainerFromProvider(service);
                        return dependencyContainer[containerName];
                    }
                    else {
                        return dependencyContainer[addServiceToContainer(service)];
                    }
                }
            });
        };
    };
    DI.override = function (service, dependencyInstance) {
        if (isProvider(service)) {
            var containerName = addServiceToContainerFromProvider(service);
            dependencyContainer[containerName] = dependencyInstance;
        }
        else {
            var containerName = addServiceToContainer(service);
            dependencyContainer[containerName] = dependencyInstance;
        }
    };
    DI.getService = function (service) {
        if (isProvider(service)) {
            var containerName = addServiceToContainerFromProvider(service);
            return dependencyContainer[containerName];
        }
        else {
            return dependencyContainer[addServiceToContainer(service)];
        }
    };
    DI.clear = function () {
        dependencyContainer = {};
    };
    DI.getContainer = function () {
        return dependencyContainer;
    };
    DI.getContainerName = function (service) {
        var containerName = '';
        if (isProvider(service)) {
            containerName = addServiceToContainerFromProvider(service);
        }
        else {
            containerName = addServiceToContainer(service);
        }
        return containerName;
    };
    return DI;
}());
exports.DI = DI;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./di */ "./src/di.ts"), exports);


/***/ })

/******/ });
//# sourceMappingURL=spec.js.map