import { DI, DIBaseFactory } from '../../src';

describe('DI:', () => {

  afterEach(() => {
    DI.clear();
  });




  /**
   * Singleton()
   */
  describe('Singleton()', () => {
    it('should attach service name', () => {
      
      @DI.Singleton('UtilityService')
      class UtilityService {}

      expect(UtilityService['diServiceName']).toEqual('UtilityService');
    });

    it('should throw error if no service name is supplied', () => {
      try {
        @DI.Singleton(undefined)
        class UtilityService {}
      } catch(e) {
        expect(e.message).toContain('Please enter a service name');
      }
    });
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
        @DI.Inject(UtilityService, 'UtilityService')
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
      @DI.Singleton('UtilityService')
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
  });




  /**
   * InjectViaFactory()
   */
  describe('InjectViaFactory()', () => {
    it('should inject using factory class', () => {
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

      class StorageFactory extends DIBaseFactory {
        serviceName = 'StorageService';

        create() {
          if (env === 'dev') return new MemoryStorageService();
          return new FileStorageService();
        }
      }

      class MyTest {
        @DI.InjectViaFactory(new StorageFactory())
        public storageSrv: BaseStorageService;
      }

      const myTest = new MyTest();
      expect(myTest.storageSrv.name).toEqual('memory-storage');
      DI.clear();
      env = 'prod';
      const myTest2 = new MyTest();
      expect(myTest2.storageSrv.name).toEqual('file-storage');
    });

    it('should inject using factory object', () => {
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

      class MyTest {
        @DI.InjectViaFactory({
          serviceName: 'StorageService',
          create: () => {
            if (env === 'dev') return new MemoryStorageService();
            return new FileStorageService();
          }
        })
        public storageSrv: BaseStorageService;
      }

      const myTest = new MyTest();
      expect(myTest.storageSrv.name).toEqual('memory-storage');
      DI.clear();
      env = 'prod';
      const myTest2 = new MyTest();
      expect(myTest2.storageSrv.name).toEqual('file-storage');
    });
  });




  /**
   * override()
   */
  describe('override()', () => {
    it('should override dependency in the container', () => {
      @DI.Singleton('UtilityService')
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
      DI.override('UtilityService', utilSrv);
      expect(myTest.utilitySrv.name).toEqual('util-2');
    });
  });




  /**
   * getService()
   */
  describe('getService()', () => {
    it('should get service from container', () => {
      @DI.Singleton('UtilityService')
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
      const srv3 = DI.getService(UtilityService, 'UtilityService');
      expect(srv3.name).toEqual('util-1');
    });
  });




  /**
   * clear()
   */
  describe('clear()', () => {
    it('should clear all dependencies from container', () => {
      @DI.Singleton('UtilityService')
      class UtilityService {
        name = 'util-1';
      }

      class MyTest {
        @DI.Inject(UtilityService)
        public utilitySrv: UtilityService;
      }

      const myTest = new MyTest();
      expect(myTest.utilitySrv.name).toEqual('util-1');
      expect(DI.getContainer()['UtilityService']).toBeDefined();
      DI.clear();
      expect(DI.getContainer()['UtilityService']).toBeUndefined();
    });
  });
});

