import {Student} from "./student";

export interface Classroom {

  id?: number
  name: string
  teacher: any
  access_code: string
  enrolled_students: Student[]

}
