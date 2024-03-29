package com.complexity.encounter.problemset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins ="http://localhost:4200")
/**
 * This is the controller for the ProblemSet class.
 * @Author Cole Gregory
 */
public class ProblemSetController
{
    @Autowired
    private ProblemSetService problemSetService;

    /**
     * A Getter method for all problem sets.
     */
    @RequestMapping("/problemsets")
    public List<ProblemSet> getAllProblemSets()
    {
        return problemSetService.getAllProblemSets();
    }

    /**
     * Returns all the problem sets associated with a Classroom
     * @param classroomId - the id of the Classroom
     * @return the list of ProblemSets
     */
    @RequestMapping("/problemsets/classroom/{classroomId}")
    public List<ProblemSet> getProblemSetsByClassroomId(@PathVariable long classroomId){
        return problemSetService.getProblemSetsByClassroomId(classroomId);
    }

    /**
     * A Getter method for a single problem set.
     */
    @RequestMapping("/problemsets/{id}")
    public ProblemSet getProblemSet(@PathVariable long id)
    {
        return problemSetService.getProblemSetById(id).get();
    }

    /**
     * This method adds a problem set to the backend
     */
    @RequestMapping(method= RequestMethod.POST, value="/problemsets")
    public ProblemSet addProblemSet(@RequestBody ProblemSet ps)
    {
        return problemSetService.saveProblemSet(ps);
    }

    /**
     * This method is for updating a problem set.
     */
    @RequestMapping(method= RequestMethod.PUT, value="/problemsets/{id}")
    public void updateProblemSet(@RequestBody ProblemSet ps, @PathVariable Long id)
    {
        problemSetService.updateProblemSet(ps, id);
    }

    /**
     * This method deletes a problem set from the backend.
     */
    @RequestMapping(method= RequestMethod.DELETE, value="/problemsets/{id}")
    public void deleteProblemSet(@PathVariable long id)
    {
        problemSetService.deleteProblemSet(id);
    }

}