import { Package } from '../package/package';
import { PackageList } from '../subscription/subscription';

export class CustomerInfo {
    id: String;
    name: String;
    email: String;
    type: String;
    applications: Package[];
    applicationLists: PackageList[];
    createDate: string;
}