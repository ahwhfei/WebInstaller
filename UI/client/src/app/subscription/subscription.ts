import { Package } from '../package/package';
import { OperatingSystem } from '../operating-system/operating-system';

export class PackageList {
    _id: string;
    id: string;
    name: string;
    description: string;
    applications: Package[];
    createDate: string;
    customer: string;
    script: string;
    supportedOS: OperatingSystem[];
    like: number;
}
