package com.complexity.encounter.classroom;

import com.complexity.encounter.student.Student;
import com.complexity.encounter.student.StudentService;
import org.apache.coyote.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
* This is the controller class for the classroom object. Its purpose is to manage
 * CRUD operations for the object.
*/

@RestController
@CrossOrigin(origins ="http://localhost:4200")
public class ClassroomController {
    @Autowired
    private ClassroomService classroomService;
    final String classroom_url = "/classrooms";
    final String localhost = "http://localhost:8080";
    final String host_url = "http://localhost:4200";

    /**
     * This method is used to look up all classrooms in the database.
     * @return A List object containing all Classrooms
     */
    @RequestMapping(classroom_url)
    @CrossOrigin(origins=host_url)
    public List<Classroom> getAllClassrooms() {return classroomService.getAllClassrooms();}

    /**
     * This method looks up a classroom by id and have the Classroom service return it.
     * @param id The id of the desired Classroom
     * @return The Classroom object matching the id passed.
     */
    @RequestMapping(classroom_url + "/{id}")
    public Classroom getClassroom(@PathVariable Long id) { return classroomService.getClassroomById(id).get();}

    @GetMapping(classroom_url + "/email/{email}")
    @CrossOrigin(origins ="http://localhost:4200")
    public List<Classroom> getClassroomsByEmail(@PathVariable String email) {
        System.out.println("Getting classrooms...");
        return classroomService.getClassroomsByTeacherEmail(email);
    }

    /**
     * This method is used to add a new Classroom object to the database.
     * @param classroom A Classroom oject to be added.
     */
    @CrossOrigin(origins=host_url)
    @RequestMapping(method = RequestMethod.POST, value=classroom_url)
    public Classroom addClassroom(@RequestBody Classroom classroom) { return classroomService.saveClassroom(classroom);}

    /**
     * This method take a Classroom object, usually from a form and updated the Classroom
     * whose id matches the id parameter.
     * @param classroom A Classroom object containing updated information for the database.
     * @param id The id of the Classroom to be updated in the database.
     */
    @RequestMapping(method=RequestMethod.PUT, value=classroom_url + "/{id}")
    public void updateClassroom(@RequestBody Classroom classroom, @PathVariable Long id){
        classroomService.updateClassroom(classroom, id);
    }

    /**
     * This method is used to delete Classroom object to the database.
     * @param id The Classroom object to be deleted.
     */

    @RequestMapping(method=RequestMethod.DELETE, value=classroom_url + "/{id}")
    public void deleteClassroom(@PathVariable Long id) {classroomService.deleteClassroom(id);}


    @RequestMapping(method=RequestMethod.PUT, value= classroom_url + "/addStudent/{classroom_id}/{student_id}")
    public Classroom addStudent(@PathVariable Long classroom_id, @PathVariable Long student_id){
        System.out.println("Request Received");
        return classroomService.addStudent(classroom_id, student_id);
    }
    @CrossOrigin(origins=host_url)
    @RequestMapping(method=RequestMethod.PUT, value= classroom_url + "/removeStudent/{classroom_id}/{student_id}")
    public Classroom removeStudent(@PathVariable Long classroom_id, @PathVariable Long student_id){
        System.out.println("Request Received");
        return classroomService.removeStudent(classroom_id, student_id);
    }


}
