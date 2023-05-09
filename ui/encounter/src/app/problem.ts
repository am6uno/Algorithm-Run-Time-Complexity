/**
 * Interface for the Problem object.
 */
export interface Problem {
    id?: number;
    setId: number;
    name: string;
    sourceCode: string[];
    complexity: string[];
    hints: string[];
    overallComplexity: string;
    totalScore: number;
}
