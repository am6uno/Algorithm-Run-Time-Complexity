import { jest } from '@jest/globals';
import { of } from 'rxjs';

let mockProblemIdMap = new Map<number, number>();
mockProblemIdMap.set(1,1);

const mockDialogRef = {
    afterClosed: jest.fn().mockReturnValue(of(mockProblemIdMap))
}


export const mockMatDialog = {
    open: jest.fn().mockReturnValue(mockDialogRef),
}

