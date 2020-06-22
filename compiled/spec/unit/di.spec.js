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
//# sourceMappingURL=di.spec.js.map