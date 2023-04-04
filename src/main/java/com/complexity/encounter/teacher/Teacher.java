package com.complexity.encounter.teacher;

import com.complexity.encounter.classroom.Classroom;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {

    @Id
    @GeneratedValue
    private long id;
    private String first_name;
    private String last_name;
    private String teacherEmail;
    @OneToMany(mappedBy = "teacher")
    private Set<Classroom> owned_classrooms;
    private char[] password_hash;

}
