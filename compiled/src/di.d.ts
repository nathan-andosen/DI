export interface IDIProvider {
    provide: any;
    useFactory?: () => any;
    useClass?: any;
}
export declare class DI {
    static Inject(service: any | IDIProvider): (target: any, propName: string) => any;
    static override(service: any | IDIProvider, dependencyInstance: any): void;
    static getService(service: any | IDIProvider): any;
    static clear(): void;
    static getContainer(): any;
    static getContainerName(service: any | IDIProvider): string;
}
