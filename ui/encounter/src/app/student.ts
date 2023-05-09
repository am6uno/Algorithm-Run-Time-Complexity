import {Classroom} from "./classroom";

/**
 * Interface for the Student object.
 */
export interface Student {
    id?: number;
    email: string;
    first_name: string;
    last_name: string;
    enrolled_classes: any;
    password_hash: string;

}
