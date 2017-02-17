import { Application } from '../application/application';
import { ApplicationList } from '../application-list/application-list';

export class CustomerInfo {
    id: String;
    name: String;
    email: String;
    type: String;
    applications: Application[];
    applicationLists: ApplicationList[];
    createDate: string;
}