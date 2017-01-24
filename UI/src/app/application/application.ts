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

export class ApplicationExt {
     public static reset(app: Application): void {
        app.id = '';
        app.name = '';
        app.description = '';
        app.version = '';
        app.message = '';
        app.script = '';
        app.quitCode = undefined;
        app.dependency = [];
        app.createDate = '';
        app.sourceURL = '';
        app.publisher = '';
        app.downloadSize = '';
        app.icon = '';
        app.like = undefined;
        app.restart = undefined;
        app.passive = undefined;
        app.quiet = undefined;
        app.supportedOS = [];
    }
}