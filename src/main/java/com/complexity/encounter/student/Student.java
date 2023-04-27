package com.complexity.encounter.student;

import com.complexity.encounter.classroom.Classroom;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
* This Java class acts as the user object for student accounts. It contains basic
 * fields for email address, first and last names, and references all classrooms that
 * the students are enrolled in. The primary difference is that enrolled students
 * are many to many with classrooms, while a classroom can only be owned by one
 * teacher.
 * @author Jason Siciliano
*/

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @GeneratedValue
    private Long id;
    private String email;
    private String first_name;
    private String last_name;

    @ManyToMany(mappedBy = "enrolled_students", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Classroom> enrolled_classrooms = new ArrayList<>();
    private char[] password_hash;

    public void addClassroom(Classroom classroom){
        enrolled_classrooms.add(classroom);
    }

    public void removeClassroom(Classroom classroom) {
        enrolled_classrooms.remove(classroom);
    }



}
