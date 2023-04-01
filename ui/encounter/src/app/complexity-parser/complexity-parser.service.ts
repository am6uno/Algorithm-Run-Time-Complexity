import { Injectable } from '@angular/core';
// import  fs  from 'fs';
import Tokenizr from "tokenizr";

@Injectable({
  providedIn: 'root'
})
export class ComplexityParserService {

  constructor() { }

  forloopExample: string = `
  for (int x = 0; x < 10; i++) {
    int x = 5;
  }

  int y = 5;

  while (true) {
    int x = 5;
  }

  if (true){

  }

  do {
    //something
  } while (i <= 10);
  `;

  forloopExample2: string = `
  for (int x = 0; x < 10; i++) {
    for (int y = 0; y < 10; y++) {
        for (int z = 0; z < 10; z++) {
          if (true){
            something }
        }
    }
  }

  
  for (int x = 0; x < 10; i++) {
    for (int y = 0; y < 10; y++) {
        for (int z = 0; z < 10; z++) {
          if (true){
            something }
        }
    }
  }
  
  `;

// for - /for\s*\(.*\)\s+\{/

// lexer.rule(/\}/, (ctx, match) => {
  //      ctx.accept("endBrace", "}")
  //    })

  // do\s*\{\s+.+\s+\}\s*while.+\;

  parse(): void {
    let lexer = new Tokenizr()

    // Rules for the loop headers
    lexer.rule(/for\s*\(.*\)\s+\{/, (ctx, match) => {
        ctx.accept("loop")
    })
    lexer.rule(/while\s*\(.*\)\s+\{/, (ctx, match) => {
      ctx.accept("loop")
    })
    lexer.rule(/do\s*\{/, (ctx, match) => {
      ctx.accept("loop")
    })


    // Rules for curly braces
    lexer.rule(/\{/, (ctx, match) => {
      ctx.accept("openCur")
    })
    lexer.rule(/\}\s*while.+\;/, (ctx, match) => {
      ctx.accept("closeDoWhile")
    })
    lexer.rule(/\}/, (ctx, match) => {
      ctx.accept("closeCur")
    })


    // Rules for other uneeded characters and whitespace

    // Ignore single line comment
    lexer.rule(/\/\/[^\r\n]*\r?\n/, (ctx, match) => {
        ctx.ignore()
    })

    // Ignore multiline comment
    lexer.rule(/\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\//, (ctx, match) => {
        ctx.ignore()
    })
    
    // Ignore white space
    lexer.rule(/[ \t\r\n]+/, (ctx, match) => {
        ctx.ignore()
    })

    // Ignore other characters
    lexer.rule(/./, (ctx, match) => {
        ctx.ignore()
    })

  
//     \/\*[^*]*\*+(?:[^/*][^*]*\*+)*\/

    /*
    lexer.input(this.forloopExample)
    lexer.debug(true)
    lexer.tokens()[0].toString();
    lexer.tokens()[1].toString();
    */
    
    lexer.input(this.forloopExample2)
    lexer.tokens().forEach((token) => {
        console.log(token.toString())
    })

    /*
    lexer.input(this.forloopExample)
    console.log(lexer.tokens()[0].toString())

    console.log(lexer.tokens()[0].column)
    console.log(lexer.tokens()[0].type)
    console.log(lexer.tokens()[0].value)
    console.log(lexer.tokens()[0].text)
    console.log(lexer.tokens()[0].pos)
    console.log(lexer.tokens()[0].line)
    */
  
  }
  
}
