import { DI, IDIProvider } from '../../src';

describe('DI:', () => {

  afterEach(() => {
    DI.clear();
  });



  /**
   * Inject()
   */
  describe('Inject()', () => {
    it('should inject dependency', () => {
      class UtilityService {
        add(num1: number, num2: number): number { return num1 + num2; }
      }

      class MyTest {
        @DI.Inject(UtilityService)
        private utilitySrv: UtilityService;

        addNumbers(num1: number, num2: number): number {
          return this.utilitySrv.add(num1, num2);
        }
      }

      const myTest = new MyTest();
      expect(myTest.addNumbers(2,2)).toEqual(4);
    });

    it('should inject singleton', () => {
      let cnt = 0;
      class UtilityService {
        private name: string;

        constructor() {
          cnt++;
          this.name = 'util-' + cnt;
        }

        getName(): string { return this.name; }
      }

      class MyTest1 {
        @DI.Inject(UtilityService)
        private utilitySrv: UtilityService;

        getName(): string {
          return this.utilitySrv.getName();
        }
      }

      class MyTest2 {
        @DI.Inject(UtilityService)
        private utilitySrv: UtilityService;

        getName(): string {
          return this.utilitySrv.getName();
        }
      }

      expect(new MyTest1().getName()).toEqual('util-1');
      expect(new MyTest2().getName()).toEqual('util-1');
    });

    it('should throw error as no service set', () => {
      try {
        class UtilityService { name = 'util'; }
        class MyTest1 {
          @DI.Inject(undefined)
          private utilitySrv: UtilityService;
        }
      } catch(e) {
        expect(e.message).toContain('Inject() error');
      }
    });
  });




  /**
   * Inject() - with provider
   */
  describe('Inject() - with provider', () => {
    it('should inject using factory', () => {
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

      const myTest = new MyTest();
      expect(myTest.storageSrv.name).toEqual('memory-storage');
      DI.clear();
      env = 'prod';
      const myTest2 = new MyTest();
      expect(myTest2.storageSrv.name).toEqual('file-storage');
    });

    it('should inject using factory as mock', () => {
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

      const myTest = new MyTest();
      expect(myTest.user.name).toEqual('mock-user');
    });

    it('should inject using factory with constructor parameters', () => {
      class Names {
        names = ['Nathan', 'David'];
      }

      class UtilityService {
        addFullStop(str: string) {
          return str + '.';
        }
      }

      class UserService {
        private name: string;
        @DI.Inject(UtilityService)
        private utilitySrv: UtilityService;

        constructor(name: string) {
          this.name = name;
        }

        getName(): string {
          return this.utilitySrv.addFullStop(this.name);
        }
      }

      const userFactory: IDIProvider = {
        provide: UserService,
        useFactory: () => {
          const name: Names = DI.getService(Names);
          return new UserService(name.names[0]);
        }
      };

      class UserModel {
        @DI.Inject(userFactory)
        userSrv: UserService;
      }
      const user = new UserModel();
      expect(user.userSrv.getName()).toEqual('Nathan.');
    });
  });




  /**
   * override()
   */
  describe('override()', () => {
    it('should override dependency in the container', () => {
      class UtilityService {
        name = 'util-1';
      }

      class MyTest {
        @DI.Inject(UtilityService)
        public utilitySrv: UtilityService;
      }

      const myTest = new MyTest();
      expect(myTest.utilitySrv.name).toEqual('util-1');
      const utilSrv = new UtilityService();
      utilSrv.name = 'util-2';
      DI.override(UtilityService, utilSrv);
      expect(myTest.utilitySrv.name).toEqual('util-2');
    });

    it('should override dependency via a provider', () => {
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

      const myTest = new MyTest();
      expect(myTest.user.name).toEqual('mock-user');
      const myTest2 = new MockUserModel();
      myTest2.name = 'mock-user-2';
      DI.override(userProvider, myTest2);
      expect(myTest.user.name).toEqual('mock-user-2');
      const containerName = DI.getContainerName(userProvider);
      const container = DI.getContainer();
      expect(container[containerName].name).toEqual('mock-user-2');
    });
  });




  /**
   * getService()
   */
  describe('getService()', () => {
    it('should get service from container', () => {
      class UtilityService {
        name = 'util-1';
      }

      class MyTest {
        @DI.Inject(UtilityService)
        public utilitySrv: UtilityService;
      }

      const myTest = new MyTest();
      expect(myTest.utilitySrv.name).toEqual('util-1');
      const srv = DI.getService(UtilityService);
      expect(srv.name).toEqual('util-1');
      // should still return service even if it has not yet been set
      DI.clear();
      const srv2 = DI.getService(UtilityService);
      expect(srv2.name).toEqual('util-1');
      const srv3 = DI.getService(UtilityService);
      expect(srv3.name).toEqual('util-1');
    });

    it('should get service via a provider', () => {
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

      const myTest = new MyTest();
      expect(myTest.user.name).toEqual('mock-user');
      const srv = <UserModel>DI.getService(userProvider);
      expect(srv.name).toEqual('mock-user');
    });
  });




  /**
   * clear()
   */
  describe('clear()', () => {
    it('should clear all dependencies from container', () => {
      class UtilityService {
        name = 'util-1';
      }

      class MyTest {
        @DI.Inject(UtilityService)
        public utilitySrv: UtilityService;
      }

      const myTest = new MyTest();
      expect(myTest.utilitySrv.name).toEqual('util-1');
      const containerName = DI.getContainerName(UtilityService);
      expect(DI.getContainer()[containerName]).toBeDefined();
      DI.clear();
      expect(Object.keys(DI.getContainer()).length).toBeLessThan(1);
    });
  });
});

