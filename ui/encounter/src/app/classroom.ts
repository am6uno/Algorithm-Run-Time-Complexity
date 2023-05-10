import {Student} from "./student";

/**
 * Interface for the Classroom object.
 */
export interface Classroom {

  id?: number
  name: string
  teacher: any
  accessCode: string
  enrolled_students: any;



}
