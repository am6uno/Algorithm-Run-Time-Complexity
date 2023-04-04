package com.complexity.encounter.classroom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class ClassroomController {
    @Autowired
    private ClassroomService classroomService;
    final String classroom_url = "/classrooms";
    final String host_url = "http://localhost:4200";
    @RequestMapping(classroom_url)
    @CrossOrigin(origins=host_url)
    public List<Classroom> getAllClassrooms() {return classroomService.getAllClassrooms();}

    @RequestMapping(classroom_url + "/{id}")
    public Classroom getClassroom(@PathVariable Long id) { return classroomService.getClassroomById(id).get();}

    @RequestMapping(method = RequestMethod.POST, value=classroom_url)
    public void addClassroom(@RequestBody Classroom classroom) {classroomService.saveClassroom(classroom);}

    @RequestMapping(method=RequestMethod.PUT, value=classroom_url + "/{id}")
    public void updateClassroom(@RequestBody Classroom classroom, @PathVariable Long id){
        classroomService.updateClassroom(classroom, id);
    }

    @RequestMapping(method=RequestMethod.DELETE, value=classroom_url + "/{id}")
    public void deleteClassroom(@PathVariable Long id) {classroomService.deleteClassroom(id);}
}
