package com.complexity.encounter.problem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
* This controller handles request for Problem objects.
*/

@RestController
@CrossOrigin(origins ="http://localhost:4200")
public class ProblemController {

    @Autowired
    private ProblemService problemService;

    /**
     * <p>
     *     Retrieves all of the problems
     * </p>
     * @return the list of problems
     */
    @RequestMapping("/problems")
    public List<Problem> getAllProblems(){
        return problemService.getAllProblems();
    }

    /**
     * <p>
     *     Retrieves a problem
     * </p>
     * @param id the id of desired problem
     * @return the problem
     */
    @RequestMapping("/problems/{id}")
    public Problem getProblem(@PathVariable long id){
        return problemService.getProblemById(id).get();
    }

    /**
     * <p>
     *     Creates a problem
     * </p>
     * @param problem the problem to add
     */
    @CrossOrigin(origins ="http://localhost:4200")
    @RequestMapping(method= RequestMethod.POST, value="/problems")
    public void addProblem(@RequestBody Problem problem){
        problemService.saveProblem(problem);
    }

    /**
     * <p>
     *     Updates a problem
     * </p>
     * @param problem the problem to update
     */
    @RequestMapping(method= RequestMethod.PUT, value="/problems/{id}")
    public void updateProblem(@RequestBody Problem problem, @PathVariable Long id) {
        problemService.updateProblem(problem, id);
    }

    /**
     * <p>
     *     Deletes a problem
     * </p>
     * @param id the id of the problem to delete
     */
    @RequestMapping(method= RequestMethod.DELETE, value="/problems/{id}")
    public void deleteProblem(@PathVariable long id){
        problemService.deleteProblem(id);
    }
}
