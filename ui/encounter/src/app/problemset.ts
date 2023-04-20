export interface ProblemSet {
    id?: number;
    name: string;
    classroomId: number;
    problemList: number[];
    type: string;
    showDate: string;
    dueDate: string;
    visibility: string;
}
