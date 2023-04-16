package com.complexity.encounter.classroom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
* This service contains the business logic for Classroom objects.
*/

@Service
public class ClassroomService {
    @Autowired
    private ClassroomRepository classroomRepository;

    /**
     * Communicates with the database to create a new Classroom object.
     * @param classroom Classroom object containing the new data to be added.
     */
    public void saveClassroom(Classroom classroom) {classroomRepository.save(classroom);}

    /**
     * Queries the database to look up all Classroom objects and returns them as a List
     * @return The list of all Classroom objects.
     */
    public List<Classroom> getAllClassrooms() {return classroomRepository.findAll();}

    /**
     * Queries the database using the passed id value and converts the result into an
     * Optional object.
     * @param id The id used in the query to look up a Classroom
     * @return An Optional object which contains the Classroom object on a hit.
     */
    public Optional<Classroom> getClassroomById(Long id) { return classroomRepository.findById(id);}


    /**
     * Deletes a Classroom object from the database.
     * @param id The id of the Classroom to be deleted.
     */
    public void deleteClassroom(Long id) {classroomRepository.deleteById(id);}

    /**
     * Updates the database with contents of the passed Classroom Object.
     * @param classroom A Classroom object with updated information.
     * @param id The id of the Classroom being updated.
     */
    public void updateClassroom(Classroom classroom, Long id) {
        Optional<Classroom> updatedClassroom = classroomRepository.findById(id);
        updatedClassroom.get().setEnrolled_students(classroom.getEnrolled_students());
        classroomRepository.save(updatedClassroom.get());
    }
}
