package com.complexity.encounter.classroom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClassroomService {
    @Autowired
    private ClassroomRepository classroomRepository;

    public void saveClassroom(Classroom classroom) {classroomRepository.save(classroom);}

    public List<Classroom> getAllClassrooms() {return classroomRepository.findAll();}

    public Optional<Classroom> getClassroomById(Long id) { return classroomRepository.findById(id);}

    public void deleteClassroom(Long id) {classroomRepository.deleteById(id);}

    public void updateClassroom(Classroom classroom, Long id) {
        Optional<Classroom> updatedClassroom = classroomRepository.findById(id);
        updatedClassroom.get().setEnrolled_students(classroom.getEnrolled_students());
        classroomRepository.save(updatedClassroom.get());
    }
}
