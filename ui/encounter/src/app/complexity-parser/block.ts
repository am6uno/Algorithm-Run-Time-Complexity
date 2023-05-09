/**
 * This interface defines a "block" of code
 */
export interface Block {
    complexity: number;
    begLine: number;
    endLine: number;
    depth: number;
}