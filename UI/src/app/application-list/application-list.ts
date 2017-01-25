import { Application } from '../application/application';
import { OperatingSystem } from '../operating-system/operating-system';

export class ApplicationList {
    _id: string;
    id: string;
    name: string;
    description: string;
    applications: Application[];
    createDate: string;
    customer: string;
    script: string;
    supportedOS: OperatingSystem[];
    like: number;
}
