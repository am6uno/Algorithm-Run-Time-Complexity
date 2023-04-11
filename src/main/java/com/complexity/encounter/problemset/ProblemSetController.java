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
    private ProblemSetService set;

    //FIXME: is this where this should be mapped? or just /problems?
    @RequestMapping("/problemsets")
    @CrossOrigin(origins = "http://localhost:4200")
    /**
     * A Getter method for all problem sets.
     */
    public List<ProblemSet> getAllProblemSets()
    {
        return set.getAllProblemSets();
    }
    @RequestMapping("/problemsets{id}")
    /**
     * A Getter method for a single problem set.
     */
    public ProblemSet getProblemSet(@PathVariable long id)
    {
        return set.getProblemSetById(id).get();
    }
    @RequestMapping(method= RequestMethod.POST, value="/problemsets")
    /**
     * This method adds a problem set to the backend
     */
    public void addProblemSet(@RequestBody ProblemSet ps)
    {
        set.saveProblemSet(ps);
    }
    @RequestMapping(method= RequestMethod.PUT, value="/problemsets/{id}")
    /**
     * This method is for updating a problem set.
     */
    public void updateProblemSet(@RequestBody ProblemSet ps, @PathVariable Long id)
    {
        set.updateProblemSet(ps, id);
    }
    @RequestMapping(method= RequestMethod.DELETE, value="/problemsets/{id}")
    /**
     * This method deletes a problem set from the backend.
     */
    public void deleteProblemSet(@PathVariable long id)
    {
        set.deleteProblemSet(id);
    }

}