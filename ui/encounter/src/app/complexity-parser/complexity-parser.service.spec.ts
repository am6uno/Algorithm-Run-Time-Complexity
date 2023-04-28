import { TestBed } from '@angular/core/testing';
import { ComplexityParserService } from './complexity-parser.service';
import { Block } from './block';

describe('ComplexityParserService', () => {
  let service: ComplexityParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplexityParserService);
  });

  it('should create component', () => {
    expect(service).toBeTruthy();
  });
  
  describe('Parse', ()=> {
    it('Should return single for loop block information', ()=> {
      const sourceCode = "for(int i = 0; i < n; i++){\nSystem.out.print(\"Hello world\");\n}";
      let expctedReturn: Block[] = [
        {
          complexity: 1,
          begLine: 1,
          endLine: 3,
          depth: 0
        }
      ];
      expect(service.parse(sourceCode)).toEqual(expctedReturn);
    });

    it('Should return return block info from nested for loops', ()=> {
      const sourceCode = "for(int i = 0; i < n; i++){\nfor(int j = 0; j < n; j++){\nSystem.out.print(\"Hello world\");\n}\n}";
      let expctedReturn: Block[] = [
        {
          complexity: 2,
          begLine: 1,
          endLine: 5,
          depth: 0
        },
        {
          complexity: 1,
          begLine: 2,
          endLine: 4,
          depth: 1
        }
      ];
      expect(service.parse(sourceCode)).toEqual(expctedReturn);
    });

    it('Should return return block info from a block', ()=> {
      const sourceCode = "{\nSysetm.out.println(\"Hello world\")\n}";
      let expctedReturn: Block[] = [];
      expect(service.parse(sourceCode)).toEqual(expctedReturn);
    });

    it('Should return single while loop block information', ()=> {
      const sourceCode = "int i = 0;\nwhile(i < N){\nSystem.out.print(\"Hello world\");\n}\nint z = i/2;";
      let expctedReturn: Block[] = [
        {
          complexity: 1,
          begLine: 2,
          endLine: 4,
          depth: 0
        }
      ];
      expect(service.parse(sourceCode)).toEqual(expctedReturn);
    });

    it('Should return single do while block information', ()=> {
      const sourceCode = "int i = 0;\ndo {\nSystem.out.print(\"Hello world\");\n}\nwhile(i < N);\nint z = i/2;";
      let expctedReturn: Block[] = [
        {
          complexity: 1,
          begLine: 2,
          endLine: 4,
          depth: 0
        }
      ];
      expect(service.parse(sourceCode)).toEqual(expctedReturn);
    });

    it('Should take into account multi line comments', ()=> {
      const sourceCode = "/*for(int i = 0; i < n; i++){\nSystem.out.print(\"Hello world\");\n}*/";
      let expctedReturn: Block[] = [];
      expect(service.parse(sourceCode)).toEqual(expctedReturn);
    });

    it('Should take into account single line comments', ()=> {
      const sourceCode = "//for(int i = 0; i < n; i++){\nSystem.out.print(\"Hello world\");\n//}";
      let expctedReturn: Block[] = [];
      expect(service.parse(sourceCode)).toEqual(expctedReturn);
    });

  });
});
