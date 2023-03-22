package com.complexity.encounter.teacher;

import com.complexity.encounter.problem.Problem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    @RequestMapping("/teachers")
    @CrossOrigin(origins="http://locahost:4200")
    public List<Teacher> getAllTeachers() {return teacherService.getAllTeachers();}

    @RequestMapping("/teachers/{id}")
    public Teacher getTeacher(@PathVariable long id){
        return teacherService.getTeacherById(id).get();
    }

    @RequestMapping(method= RequestMethod.POST, value="/teachers")
    public void addTeacher(@RequestBody Teacher teacher){
        teacherService.saveTeacher(teacher);
    }

    @RequestMapping(method= RequestMethod.PUT, value="/teachers/{id}")
    public void updateTeacher(@RequestBody Teacher teacher, @PathVariable Long id) {
        teacherService.updateTeacher(teacher, id);
    }

    @RequestMapping(method= RequestMethod.DELETE, value="/teachers/{id}")
    public void deleteTeacher(@PathVariable long id){
        teacherService.deleteTeacher(id);
    }



}