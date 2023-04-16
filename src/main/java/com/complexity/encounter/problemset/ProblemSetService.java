package com.complexity.encounter.problemset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
/**
 * This is the service for the ProblemSet class.
 * @Author Cole Gregory
 */
public class ProblemSetService
{
    @Autowired
    private ProblemSetRepository problemSetRepository;

    /**
     * This method saves a ProblemSet to the backend.
     * @param set - the ProblemSet to be saved
     */
    public void saveProblemSet(ProblemSet set)
    {
        problemSetRepository.save(set);
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

}