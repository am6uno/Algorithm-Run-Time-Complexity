import { Injectable } from '@angular/core';
// import  fs  from 'fs';
import Tokenizr from "tokenizr";

@Injectable({
  providedIn: 'root'
})
export class ComplexityParserService {

  constructor() { }

  example: string = `
    foo {
    baz = 1 // sample comment
    bar {
        quux = 42
        hello = "hello \"world\"!"
    }
    quux = 7
}`;

  parse(): void {
    let lexer = new Tokenizr()

    lexer.rule(/[a-zA-Z_][a-zA-Z0-9_]*/, (ctx, match) => {
        ctx.accept("id")
    })
    lexer.rule(/[+-]?[0-9]+/, (ctx, match) => {
        ctx.accept("number", parseInt(match[0]))
    })
    lexer.rule(/"((?:\\"|[^\r\n])*)"/, (ctx, match) => {
        ctx.accept("string", match[1].replace(/\\"/g, "\""))
    })
    lexer.rule(/\/\/[^\r\n]*\r?\n/, (ctx, match) => {
        ctx.ignore()
    })
    lexer.rule(/[ \t\r\n]+/, (ctx, match) => {
        ctx.ignore()
    })
    lexer.rule(/./, (ctx, match) => {
        ctx.accept("char")
    })

    //let cfg = fs.readFileSync("sample.cfg", "utf8")
    console.log("hi")
    lexer.input(this.example)
    lexer.debug(true)
    lexer.tokens().forEach((token) => {
        console.log(token.toString())
    })
  }
  
}
