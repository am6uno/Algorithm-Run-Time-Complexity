package com.complexity.encounter.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {
    @Autowired
    private StudentService studentService;

    @RequestMapping("/students")
    @CrossOrigin(origins="http://locahost:4200")
    public List<Student> getAllStudents() {return studentService.getAllStudents();}

    @RequestMapping("/students/{id}")
    public Student getStudent(@PathVariable long id){
        return studentService.getStudentById(id).get();
    }

    @RequestMapping(method= RequestMethod.POST, value="/students")
    public void addStudent(@RequestBody Student student){
        studentService.saveStudent(student);
    }

    @RequestMapping(method= RequestMethod.PUT, value="/students/{id}")
    public void updateStudent(@RequestBody Student student, @PathVariable Long id) {
        studentService.updateStudent(student, id);
    }

    @RequestMapping(method= RequestMethod.DELETE, value="/students/{id}")
    public void deleteStudent(@PathVariable long id){
        studentService.deleteStudent(id);
    }



}
