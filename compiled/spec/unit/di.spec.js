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
var src_1 = require("../../src");
describe('DI:', function () {
    afterEach(function () {
        src_1.DI.clear();
    });
    describe('Singleton()', function () {
        it('should attach service name', function () {
            var UtilityService = (function () {
                function UtilityService() {
                }
                UtilityService = __decorate([
                    src_1.DI.Singleton('UtilityService')
                ], UtilityService);
                return UtilityService;
            }());
            expect(UtilityService['diServiceName']).toEqual('UtilityService');
        });
        it('should throw error if no service name is supplied', function () {
            try {
                var UtilityService = (function () {
                    function UtilityService() {
                    }
                    UtilityService = __decorate([
                        src_1.DI.Singleton(undefined)
                    ], UtilityService);
                    return UtilityService;
                }());
            }
            catch (e) {
                expect(e.message).toContain('Please enter a service name');
            }
        });
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
                    src_1.DI.Inject(UtilityService, 'UtilityService'),
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
                UtilityService = __decorate([
                    src_1.DI.Singleton('UtilityService'),
                    __metadata("design:paramtypes", [])
                ], UtilityService);
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
    });
    describe('InjectViaFactory()', function () {
        it('should inject using factory class', function () {
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
            var StorageFactory = (function (_super) {
                __extends(StorageFactory, _super);
                function StorageFactory() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.serviceName = 'StorageService';
                    return _this;
                }
                StorageFactory.prototype.create = function () {
                    if (env === 'dev')
                        return new MemoryStorageService();
                    return new FileStorageService();
                };
                return StorageFactory;
            }(src_1.DIBaseFactory));
            var MyTest = (function () {
                function MyTest() {
                }
                __decorate([
                    src_1.DI.InjectViaFactory(new StorageFactory()),
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
        it('should inject using factory object', function () {
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
            var MyTest = (function () {
                function MyTest() {
                }
                __decorate([
                    src_1.DI.InjectViaFactory({
                        serviceName: 'StorageService',
                        create: function () {
                            if (env === 'dev')
                                return new MemoryStorageService();
                            return new FileStorageService();
                        }
                    }),
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
    });
    describe('override()', function () {
        it('should override dependency in the container', function () {
            var UtilityService = (function () {
                function UtilityService() {
                    this.name = 'util-1';
                }
                UtilityService = __decorate([
                    src_1.DI.Singleton('UtilityService')
                ], UtilityService);
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
            src_1.DI.override('UtilityService', utilSrv);
            expect(myTest.utilitySrv.name).toEqual('util-2');
        });
    });
    describe('getService()', function () {
        it('should get service from container', function () {
            var UtilityService = (function () {
                function UtilityService() {
                    this.name = 'util-1';
                }
                UtilityService = __decorate([
                    src_1.DI.Singleton('UtilityService')
                ], UtilityService);
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
            var srv3 = src_1.DI.getService(UtilityService, 'UtilityService');
            expect(srv3.name).toEqual('util-1');
        });
    });
    describe('clear()', function () {
        it('should clear all dependencies from container', function () {
            var UtilityService = (function () {
                function UtilityService() {
                    this.name = 'util-1';
                }
                UtilityService = __decorate([
                    src_1.DI.Singleton('UtilityService')
                ], UtilityService);
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
            expect(src_1.DI.getContainer()['UtilityService']).toBeDefined();
            src_1.DI.clear();
            expect(src_1.DI.getContainer()['UtilityService']).toBeUndefined();
        });
    });
});
//# sourceMappingURL=di.spec.js.map