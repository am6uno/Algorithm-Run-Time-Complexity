import { Injectable } from '@angular/core';
// import  fs  from 'fs';
import Tokenizr, { Token } from "tokenizr";

@Injectable({
  providedIn: 'root'
})
export class ComplexityParserService {

  constructor() { }
  

  parse(sourceCode: string): void {

    interface Block {
      complexity: number;
      begLine: number;
      endLine: number;
    }

    let lexer = new Tokenizr()
    let blockList: Block[] = []

    let blockDepth: number = 0        // keeps track of the number of nested blocks
    let rootBlock: number = 0            // keeps track of the index of the uppermost block
    let initialStackLength: number = 0

    let stack: Token[] = []          // I might not need this, I could just use lexer.tokens()
    let openCurCount: number = 0     // keeps track of the open braces that don't belong to any of the loops
    

  
    
    // Configure the parser
    this.parserConfiguration(lexer);


    // Execute lexer and configure stack
    lexer.input(sourceCode)
    lexer.tokens().forEach((token) => {
      stack.push(token)
    })
    stack.reverse()
    initialStackLength = stack.length
    

    console.log(stack)
    // console.log(stack.length);

    for (let i = 0; i < initialStackLength; i++) {

      let currToken = stack.pop()

      if (currToken?.type === "loop") {

        let newBlock = {
          complexity: 1,
          begLine: currToken.line,
          endLine: -1
        }

        // Add the new block to the block list
        blockList.push(newBlock)

        // Set the root block
        if (blockDepth == 0) {
          rootBlock = blockList.length - 1;
        }

        // Increase the block depth
        blockDepth++;

        continue;
      }

      if (currToken?.type === "openCur") {
        openCurCount++;
        continue;
      }

      if (currToken?.type === "closeCur" && openCurCount > 0) {
        openCurCount--;
        continue;
      } 
      
      if ((currToken?.type === "closeCur" || currToken?.type === "closeDoWhile") && openCurCount == 0) {
        
        // Decrease the block depth now that a block has been found
        blockDepth--;

        // Check if this block is inside another block, if so, update the previous block complexities
        if (blockDepth > 0) {
          // blockList[rootBlock].complexity++
          for (let i = blockList.length - blockDepth; i > rootBlock; i--) {                    // wrong
            blockList[i - 1].complexity++
          }

        }

        blockList[blockDepth + rootBlock].endLine = currToken.line;         // wrong
        // Check if this block's closing brace is inside another block
      

      }
    }

    console.log(blockList);
  }

  private parserConfiguration(lexer: Tokenizr) {

    // Rules for the loop headers
    lexer.rule(/for\s*\(.*\)\s+\{/, (ctx, match) => {
      ctx.accept("loop");
    });
    lexer.rule(/while\s*\(.*\)\s+\{/, (ctx, match) => {
      ctx.accept("loop");
    });
    lexer.rule(/do\s*\{/, (ctx, match) => {
      ctx.accept("loop");
    });

    // Rules for curly braces
    lexer.rule(/\{/, (ctx, match) => {
      ctx.accept("openCur");
    });
    lexer.rule(/\}\s*while.+\;/, (ctx, match) => {
      ctx.accept("closeDoWhile");
    });
    lexer.rule(/\}/, (ctx, match) => {
      ctx.accept("closeCur");
    });


    // Rules for other uneeded characters and whitespace
    // Ignore single line comment
    lexer.rule(/\/\/[^\r\n]*\r?\n/, (ctx, match) => {
      ctx.ignore();
    });

    // Ignore multiline comment
    lexer.rule(/\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\//, (ctx, match) => {
      ctx.ignore();
    });

    // Ignore white space
    lexer.rule(/[ \t\r\n]+/, (ctx, match) => {
      ctx.ignore();
    });

    // Ignore other characters
    lexer.rule(/./, (ctx, match) => {
      ctx.ignore();
    });
  }
}
