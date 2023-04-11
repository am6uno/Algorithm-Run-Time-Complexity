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
    public List<ProblemSet> getAllProblemSets()
    {
        return set.getAllProblemSets();
    }
    @RequestMapping("/problemsets{id}")
    public ProblemSet getProblemSet(@PathVariable long id)
    {
        return set.getProblemSetById(id).get();
    }
    @RequestMapping(method= RequestMethod.POST, value="/problemsets")
    public void addProblemSet(@RequestBody ProblemSet ps)
    {
        set.saveProblemSet(ps);
    }
    @RequestMapping(method= RequestMethod.PUT, value="/problemsets/{id}")
    public void updateProblemSet(@RequestBody ProblemSet ps, @PathVariable Long id)
    {
        set.updateProblemSet(ps, id);
    }
    @RequestMapping(method= RequestMethod.DELETE, value="/problemsets/{id}")
    public void deleteProblemSet(@PathVariable long id)
    {
        set.deleteProblemSet(id);
    }

}