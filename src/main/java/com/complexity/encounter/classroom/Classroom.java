package com.complexity.encounter.classroom;


import com.complexity.encounter.student.Student;
import com.complexity.encounter.teacher.Teacher;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Classroom {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name="teacher_id", nullable = false)
    private Teacher teacher;

    @ManyToMany
    @JoinTable(
            name="classroom_set",
            joinColumns = @JoinColumn(name="classroom_id"),
            inverseJoinColumns = @JoinColumn(name="student_id")
    )
    private Set<Student> enrolled_students;
}
