package com.complexity.encounter.teacher;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {

    @Id
    @Generated
    private long id;
    private String first_name;
    private String last_name;
    private String teacher_email;
    private char[] password_hash;

}
