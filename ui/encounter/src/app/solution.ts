/**
 * Interface for the Solution object.
 */
export interface Solution {
    id?: number;
    studentId: number;
    problemId: number;
    complexityAnswer: string[];
    overallComplexity: string;
    score: number;
}
