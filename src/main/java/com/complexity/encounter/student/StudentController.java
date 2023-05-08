package com.complexity.encounter.student;
import com.complexity.encounter.classroom.Classroom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
* This controller handles request for Student objects.
*/

@RestController
@CrossOrigin(origins ="http://localhost:4200")
public class StudentController {
    @Autowired
    private StudentService studentService;
    /**
     * This method is used to return a list of all Students in the database.
     * @return A List object containing all Students
     */
    @GetMapping("/students")
    @CrossOrigin(origins="*")
    public List<Student> getAllStudents() {return studentService.getAllStudents();}
    /**
     * This method looks up a Student by id and have the Student service return it.
     * @param id The id of the desired Teacher
     * @return The Student object matching the id passed.
     */
    @RequestMapping("/students/{id}")
    public Student getStudent(@PathVariable long id){
        return studentService.getStudentById(id).get();
    }
    /**
     * This method looks up a Student using a passed email address.
     * @param email The email address of the desired Student.
     * @return A Student object matching the email address.
     */
    @RequestMapping("/students/email/{email}")
    @CrossOrigin(origins ="http://localhost:4200")
    public Optional<Student> getStudentByEmail(@PathVariable String email){
        return studentService.getStudentByEmail(email);
    }
    /**
     * This method returns all the classes that a student is enrolled to.
     * @param id The id of the student
     * @return A classroom list
     */
    @RequestMapping("/students/{id}/classrooms")
    @CrossOrigin(origins ="http://localhost:4200")
    public List<Classroom> getStudentClassrooms(@PathVariable long id){
        return studentService.getStudentClassrooms(id);
    }
    /**
     * Sends a Student object to the service to be added to the database.
     * @param student The Student object to be added.
     */
    @CrossOrigin(origins ="http://localhost:4200")
    @RequestMapping(method= RequestMethod.POST, value="/students")
    public void addStudent(@RequestBody Student student){
        studentService.saveStudent(student);
    }
    /**
     * This method take a Teacher object, usually from a form and updated the Student
     * whose id matches the id parameter.
     * @param student A Student object containing updated information for the database.
     * @param id The id of the Student to be updated in the database.
     */
    @RequestMapping(method= RequestMethod.PUT, value="/students/{id}")
    public void updateStudent(@RequestBody Student student, @PathVariable Long id) {
        studentService.updateStudent(student, id);
    }
    /**
     * This method is used to delete Student object to the database.
     * @param id The Student object to be deleted.
     */
    @RequestMapping(method= RequestMethod.DELETE, value="/students/{id}")
    public void deleteStudent(@PathVariable long id){
        studentService.deleteStudent(id);
    }

    @RequestMapping(method=RequestMethod.GET, value="/students/{id}/classrooms")
    @CrossOrigin(origins ="http://localhost:4200")
    public Long[] getStudentClassrooms(@PathVariable long id){
        return studentService.getStudentClassrooms(id);
    }



}
