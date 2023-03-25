export interface Problem {
    id?: number;
    name: string;
    sourceCode: string[];
    complexity: string[];
    hints: string[];
    overallComplexity: string;
    totalScore: number;
}
