import { OperatingSystem } from '../operating-system/operating-system';

export class Application {
    id: string;
    name: string;
    description: string;
    version: string;
    message: string;
    script: string;
    quitCode: number;
    dependency: Array<Application>;
    createDate: string;
    sourceURL: string;
    publisher: string;
    downloadSize: string;
    icon: string;
    like: number;
    restart: boolean;
    passive: boolean;
    quiet: boolean;
    supportedOS: Array<OperatingSystem>;
}