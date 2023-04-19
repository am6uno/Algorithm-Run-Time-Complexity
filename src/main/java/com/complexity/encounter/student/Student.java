package com.complexity.encounter.student;

import com.complexity.encounter.classroom.Classroom;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
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
    @ManyToMany(mappedBy = "enrolled_students")
    @JsonIgnore
    private Set<Classroom> enrolled_classes= new HashSet<>();
    private char[] password_hash;

}
