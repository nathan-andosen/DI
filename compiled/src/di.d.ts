export declare class DI {
    static Singleton(serviceName: string): (target: any) => void;
    static Inject(service: any, serviceName?: string): (target: any, propName: string) => any;
    static InjectViaFactory(factory: DIBaseFactory | IDIBaseFactory): (target: any, propName: string) => any;
    static override(serviceName: string, dependencyInstance: any): void;
    static getService(service: any, serviceName?: string): any;
    static clear(): void;
    static getContainer(): any;
}
export declare abstract class DIBaseFactory {
    abstract serviceName: string;
    abstract create(): any;
}
export interface IDIBaseFactory {
    serviceName: string;
    create: () => any;
}
