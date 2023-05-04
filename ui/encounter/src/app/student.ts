import {Classroom} from "./classroom";

export interface Student {
    id?: number;
    email: string;
    first_name: string;
    last_name: string;
    enrolled_classes: any;
    password_hash: string;

}
