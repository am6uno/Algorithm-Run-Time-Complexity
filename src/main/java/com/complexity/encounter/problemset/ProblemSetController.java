package com.complexity.encounter.problemset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
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
    @CrossOrigin(origins = "http://localhost:4200")
    public List<ProblemSet> getAllProblemSets()
    {
        return problemSetService.getAllProblemSets();
    }

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
    public void addProblemSet(@RequestBody ProblemSet ps)
    {
        problemSetService.saveProblemSet(ps);
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