import * as ts from "typescript";
// https://www.npmjs.com/package/uuid
// import { v4 as uuidv4 } from 'uuid';
import { v4 as uuidv4 } from "uuid"; // pnpm add --save uuid @types/uuid

import {
  fmBooleanType,
  fmNumberType,
  fmStringType,
  fmUnSelectedType,
  FrontmatterField,
  FrontMatterFieldType,
} from "./../../../components/ContentType/ContentTypeContext";
/**
 * To test the thing : 
 * https://stackblitz.com/edit/node-typescript-playground-jtmhvv?file=src%2Findex.ts,nodemon.json,src%2FValidator.ts,src%2Fyang-types%2Findex.ts,src%2Fmytypes%2Ftest1.ts,tsconfig.json
 */
/**
 * This class Validates that a frontmatter definition is a valid TypeScript (that there is no complitation error)
 */
export class FrontmatterTsValidator {
  /**
   * The unique ID of the Code Analysis processed by this {@FrontmatterTsValidator } instance
   */
  private unique_id: string;
  /**
   * The ts Compiler API program instance which
   * will used to compile the typescript code
   */
  private program: ts.Program;
  /**
   * The filename of the file in which the soruce
   * code to process will be saved to.
   */
  private filename: string;
  /**
   * The source file obeject used by the TS compiler API
   */
  private sourceFile: ts.SourceFile;
  /**
   * The type checker
   */
  private typeChecker: ts.TypeChecker;

  private frontmatterFields: FrontmatterField[];
  constructor(protected tsCodeToValidate: string) {
    // nothing to do there, properties are implicitly initialized
    /**
     * we need a random unique id for each file that is going to be generated, just to put the string source code into it, for later ts compiler api processing.
     */
    this.unique_id = uuidv4();
    // console.log(randomUuid); // '398de222-5bf9-4754-8e3e-011a55307014'

    this.filename = `test_${this.unique_id}.ts`;
    // const code = `const test: number = 1 + 2;`;
    this.program = this.initProgram();
    /**
     * check the program is properly initialized
     */
    console.log(
      `Here is the Node Count of the parsed frontmatter: [${this.program.getNodeCount()}]`
    );
    this.sourceFile = ts.createSourceFile(
      this.filename,
      this.tsCodeToValidate,
      ts.ScriptTarget.Latest /*,// ts.ScriptTarget.ES2015,*/
      // /*setParentNodes */ true
    );

    this.typeChecker = this.program.getTypeChecker();
    this.frontmatterFields = [];
  }

  /**
   * Initializes the TS Compiler API {@Program } instance which will process Source Code Analysis
   * @returns the TS Compiler API {@Program } instance which will process Source Code Analysis
   */
  private initProgram = (): ts.Program => {
    // const sourceFile = ts.createSourceFile(
    //   this.filename,
    //   this.tsCodeToValidate,
    //   ts.ScriptTarget.Latest/*,// ts.ScriptTarget.ES2015,*/
    //   // /*setParentNodes */ true
    // );

    const defaultCompilerHost = ts.createCompilerHost({});

    const customCompilerHost: ts.CompilerHost = {
      getSourceFile: (name, languageVersion) => {
        console.log(
          `[FrontmatterTsValidator] - [initProgram] - getSourceFile ${name}`
        );

        if (name === this.filename) {
          return this.sourceFile;
        } else {
          return defaultCompilerHost.getSourceFile(name, languageVersion);
        }
      },
      writeFile: (filename, data) => {},
      getDefaultLibFileName: () => "",// `lib_${this.unique_id}.d.ts`, //"lib.d.ts",
      useCaseSensitiveFileNames: () => false,
      getCanonicalFileName: (filename) => filename,
      getCurrentDirectory: () => "",
      getNewLine: () => "\n",
      getDirectories: () => [],
      fileExists: () => true,
      readFile: () => "",
    };

    return ts.createProgram([this.filename], {}, customCompilerHost);
  };

  /**
   * Returns true if the provided source {@} code validates
   * @throws an Error, if the analyzed TS source code has at least one compilation error.
   */
  public validate = (): boolean => {
    const diagnostics = ts.getPreEmitDiagnostics(this.program);
    console.log(
        `[FrontmatterTsValidator] - [validate] - diagnostics: `,
        diagnostics
      );
      console.log(
        `[FrontmatterTsValidator] - [validate] - [this.tsCodeToValidate]: `,
        this.tsCodeToValidate
      );
      console.log(
        `[FrontmatterTsValidator] - [validate] - ts.DiagnosticCategory.Error is : `,
        ts.DiagnosticCategory.Error
      );
    // let allErrorMessages: string = ``

    /**
     * if there is at least one error in diag
     */
    for (const diagnostic of diagnostics) {
      const message = diagnostic.messageText;
      if (diagnostic.category == ts.DiagnosticCategory.Error) {
        console.error(
          `The parsed frontmatter has typescript compilation errors, e.g. [${message}]`
        );
        throw new Error(
          `The parsed frontmatter has typescript compilation errors, e.g. [${message}]`
        );
      }
      // let exampleCateg: ts.DiagnosticCategory = ts.DiagnosticCategory.Error

      /*
        const file = diagnostic.file;
        const filename = file?.fileName;
    
        const lineAndChar = file?.getLineAndCharacterOfPosition(
            diagnostic.start || 0
        );
    
        const line = (lineAndChar?.line || 0) + 1;
        const character = (lineAndChar?.character || 0) + 1;
        */
      // console.log(message);
      // console.log(`(${filename}:${line}:${character})`);
    }
    return true;
  };

  public generateFrontmatterFields(): FrontmatterField[] {
    /*[
    {
      fmType: "fmBoolean",
      name: "dummy"
    }
    ]*/
    ts.forEachChild(this.sourceFile, (node: ts.Node) => {
      if (!ts.isInterfaceDeclaration(node)) {
        throw new Error(`A Frontmatter definition MUST be a typescript interface declaration! The provided source code of the frontmatter declaration is: [${this.tsCodeToValidate}]`)
      };

      const type = this.typeChecker.getTypeAtLocation(node);
      console.info(
        `[FrontmatterTsValidator] - [generateFrontmatterFields()] [type.getSymbol()] is: [${
            type.getSymbol()
        }] \n and [this.tsCodeToValidate] is: [${this.tsCodeToValidate}]`
      );
      // const baseType = type?.getBaseTypes()?.[0];
      // const properties = baseType?.getProperties() ?? []; // -> inherited properties
      const properties = type?.getProperties() ?? []; // -> inherited properties

      for (const property of properties) {
        console.info(
            `[FrontmatterTsValidator] - [generateFrontmatterFields()] Parsing property [${
              property.name
            }] of the following frontmatter declaration: [${this.tsCodeToValidate}]`
          );
        // // Here is where I have the problem, this declaration is the declaration
        // // defined in the interface `Props` and I don't want it because it's optional
        // const decl = property.getDeclarations()?.[0];
        // let parsedFmType: FrontMatterFieldType = "fmUnSelectedType"

        let propertyDeclarations = property.getDeclarations();
        if (!propertyDeclarations) {
          throw new Error(
            `[FrontmatterTsValidator] - [generateFrontmatterFields()] Parsed property [${property.name}] has an empty declaration`
          );
        }
        // let propertyDeclaration: ts.Declaration = (propertyDeclarations?propertyDeclarations[0]:null);
        let propertyDeclaration: ts.Declaration = propertyDeclarations[0];
        let parsedFmType = propertyDeclaration.getText();
        console.error(
          `[FrontmatterTsValidator] - [generateFrontmatterFields()] Parsed property [${
            property.name
          }] has the following declaration: [${propertyDeclaration.getText()}]`
        );

        this.frontmatterFields.push({
          fmType: "fmBoolean",
          name: property.getName(),
        });

        /*
            switch (cc) {
                case "fmBoolean": {
                  toReturn = "boolean";
                  return toReturn;
                  //break;
                }
                case "fmNumber": {
                  toReturn = "number";
                  return toReturn;
                  //break;
                }
                case "fmString": {
                  toReturn = "string";
                  return toReturn;
                  //break;
                }
                case "fmUnSelectedType": {
                  throw new Error(
                    `convertFmTypeToTs -> Cannot convert to TS type, because the provided field: [${fmTypeValue}],  is "fmUnSelectedType"`
                  );
                  //break;
                }
                default: {
                  //statements;
                  throw new Error(
                    `convertFmTypeToTs -> Cannot convert to TS type, the provided field [${fmTypeValue}]`
                  );
                  //break;
                }
            }
            */

        // Returns true and I want it to be false because of the `Required`
        // utility type
        //const isOptional = !!decl?.questionToken;
      }
    });
    return this.frontmatterFields;
  }
}
