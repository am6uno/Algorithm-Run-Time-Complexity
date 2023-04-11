package com.complexity.encounter.teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

/**
* This controller handles request for Teacher objects.
*/

@RestController
public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    /**
     * This method is used to return a list of all teachers in the database.
     * @return A List object containing all Teachers
     */
    @RequestMapping("/teachers")
    @CrossOrigin(origins="http://locahost:4200")
    public List<Teacher> getAllTeachers() {return teacherService.getAllTeachers();}
    /**
     * This method looks up a Teacher by id and have the Teacher service return it.
     * @param id The id of the desired Teacher
     * @return The Teacher object matching the id passed.
     */
    @RequestMapping("/teachers/{id}")
    public Teacher getTeacher(@PathVariable long id){
        return teacherService.getTeacherById(id).get();
    }

    /**
     * This method looks up a teacher using a passed email address.
     * @param email The email address of the desired Teacher.
     * @return A Teacher object matching the email address.
     */
    @RequestMapping("/teachers/email/{email}")
    @CrossOrigin(origins ="http://localhost:4200")
    public Optional<Teacher> getTeacherByEmail(@PathVariable String email){
        return teacherService.getTeacherByEmail(email);
    }

    /**
     * Sends a Teacher object to the service to be added to the database.
     * @param teacher The Teacher object to be added.
     */
    @CrossOrigin(origins ="http://localhost:4200")
    @RequestMapping(method= RequestMethod.POST, value="/teachers")
    public void addTeacher(@RequestBody Teacher teacher){
        teacherService.saveTeacher(teacher);
    }

    /**
     * This method take a Teacher object, usually from a form and updated the Teacher
     * whose id matches the id parameter.
     * @param teacher A Teacher object containing updated information for the database.
     * @param id The id of the Teacher to be updated in the database.
     */
    @RequestMapping(method= RequestMethod.PUT, value="/teachers/{id}")
    public void updateTeacher(@RequestBody Teacher teacher, @PathVariable Long id) {
        teacherService.updateTeacher(teacher, id);
    }
    /**
     * This method is used to delete Teacher object to the database.
     * @param id The Teacher object to be deleted.
     */
    @RequestMapping(method= RequestMethod.DELETE, value="/teachers/{id}")
    public void deleteTeacher(@PathVariable long id){
        teacherService.deleteTeacher(id);
    }



}
