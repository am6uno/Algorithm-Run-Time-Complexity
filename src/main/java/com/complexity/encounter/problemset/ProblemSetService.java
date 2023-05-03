package com.complexity.encounter.problemset;

import com.complexity.encounter.problem.Problem;
import com.complexity.encounter.problem.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * This is the service for the ProblemSet class.
 * @Author Cole Gregory
 */
@Service
public class ProblemSetService
{
    @Autowired
    private ProblemSetRepository problemSetRepository;
    @Autowired
    private ProblemService problemService;

    /**
     * This method saves a ProblemSet to the backend.
     * @param set - the ProblemSet to be saved
     */
    public ProblemSet saveProblemSet(ProblemSet set)
    {
        return problemSetRepository.save(set);
    }

    /**
     * This method is a getter that returns all problem sets.
     * @return all ProblemSets
     */
    public List<ProblemSet> getAllProblemSets()
    {
        return problemSetRepository.findAll();
    }

    public List<ProblemSet> getProblemSetsByClassroomId(long classroomId) {
        return problemSetRepository.findByClassroomId(classroomId);
    }

    /**
     * This method is a getter for a single ProblemSet.
     * @param id - the id of the problem set being returned
     * @return the repository method to find the ProblemSet by the given id
     */
    public Optional<ProblemSet> getProblemSetById(long id)
    {
        return problemSetRepository.findById(id);
    }

    /**
     * This method deletes a ProblemSet from the backend.
     * @param id - the id of the set to be deleted.
     */
    public void deleteProblemSet(long id)
    {
        problemSetRepository.deleteById(id);
    }

    /**
     * This method updates a ProblemSet.
     * @param set - the set to grab info from
     * @param id - the id of the ProblemSet being updated
     */
    public void updateProblemSet(ProblemSet set, Long id)
    {
        Optional<ProblemSet> updatedProblemSet = problemSetRepository.findById(id);
        updatedProblemSet.get().setName(set.getName());
        updatedProblemSet.get().setClassroomId(set.getClassroomId());
        updatedProblemSet.get().setProblemList(set.getProblemList());
        updatedProblemSet.get().setType(set.getType());
        updatedProblemSet.get().setShowDate(set.getShowDate());
        updatedProblemSet.get().setDueDate(set.getDueDate());
        updatedProblemSet.get().setVisibility(set.getVisibility());
        problemSetRepository.save(updatedProblemSet.get());
    }

    /**
     * This method updates a ProblemSet's list with a new problem ID.
     * @param problem - the problem to add
     */
    public void addToProblemSetProblemList(Problem problem)
    {

        /*
        System.out.println("Recieved Problem: " + problem.getId());

        Optional<ProblemSet> updatedProblemSet = problemSetRepository.findById(
                problemService.getProblemById(problem.getId()).get().getSetId());

        ArrayList<Long> problemList = updatedProblemSet.get().getProblemList();
        problemList.add(problem.getId());


        System.out.println("Problem list in problem set " + updatedProblemSet.get().getId() + " being saved is:");
        for (int i = 0; i < problemList.size(); i++) {
            System.out.println("#" + i + " ID:" + problemList.get(i));
        }


        updatedProblemSet.get().setProblemList(problemList);


      //  updatedProblemSet.get().getProblemList().add(problemId);
         */

        Optional<ProblemSet> updatedProblemSet = problemSetRepository.findById(problem.getSetId());

        updatedProblemSet.get().getProblemList().add(problem.getId());



        System.out.println("Set " + updatedProblemSet.get().getId() + " will now save problem IDs:");
        for (int i = 0; i < updatedProblemSet.get().getProblemList().size(); i++) {
            System.out.println("#" + i + " ID:" + updatedProblemSet.get().getProblemList().get(i));
        }


        problemSetRepository.save(updatedProblemSet.get());
        problemSetRepository.flush();
    }

    /**
     * This method removes a problem ID from a ProblemSet's list.
     * @param problemId - the problem id to remove to the ProblemSet list
     */
    public void removeFromProblemSetProblemList(Long problemId)
    {
        Optional<ProblemSet> updatedProblemSet = problemSetRepository.findById(
                problemService.getProblemById(problemId).get().getSetId());

        updatedProblemSet.get().getProblemList().remove(problemId);
        problemSetRepository.save(updatedProblemSet.get());
    }

}