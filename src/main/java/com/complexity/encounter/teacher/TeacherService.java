package com.complexity.encounter.teacher;

import com.complexity.encounter.teacher.Teacher;
import com.complexity.encounter.teacher.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;
    public void saveTeacher(Teacher teacher) {
        teacherRepository.save(teacher);
    }
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }
    public Optional<Teacher> getTeacherById(long id) {
        return teacherRepository.findById(id);
    }
    public Optional<Teacher> getTeacherByEmail(String email){ return teacherRepository.findByTeacherEmail(email);}
    public void deleteTeacher(long id) {
        teacherRepository.deleteById(id);
    }
    public void updateTeacher(Teacher teacher, Long id) {
        Optional<Teacher> updatedTeacher = teacherRepository.findById(id);
        updatedTeacher.get().setFirst_name(teacher.getFirst_name());
        updatedTeacher.get().setLast_name(teacher.getLast_name());
        updatedTeacher.get().setTeacherEmail(teacher.getTeacherEmail());
        updatedTeacher.get().setPassword_hash(teacher.getPassword_hash());
        teacherRepository.save(updatedTeacher.get());
    }
}
