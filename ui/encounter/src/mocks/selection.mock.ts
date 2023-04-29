import { jest } from '@jest/globals';

export const mockRange = {
    insertNode: jest.fn(),
    setStartAfter: jest.fn(),
    setEndAfter: jest.fn(),
}

export const mockSelection = {
    getRangeAt: jest.fn().mockReturnValue(mockRange)
}