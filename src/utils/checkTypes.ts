import * as ts from "typescript";

const checkTypes = (code: string, test: string) => {
  const compilerOptions: ts.CompilerOptions = {
    baseUrl: "./",
    moduleResolution: ts.ModuleResolutionKind.Node16,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    declaration: true,
    removeComments: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    allowJs: true,
    skipLibCheck: true,
    skipDefaultLibCheck: true,
    noLib: false,
    lib: ["ES2015", "DOM"],
    paths: {
      "type-assertions": ["node_modules/type-assertions"],
    },
  };

  const globalObject = { console };

  const host: ts.CompilerHost = {
    readFile: (fileName) => (fileName === "code.ts" ? code : test),
    fileExists: (fileName) => fileName === "code.ts" || fileName === "test.ts",
    // getDefaultLibFileName: () => "lib.d.ts",
    getDefaultLibFileName: () => "typescript/lib/lib.d.ts",
    useCaseSensitiveFileNames: () => true,
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: () => "",
    getNewLine: () => ts.sys.newLine,
    writeFile: (fileName) => {
      ts.createSourceFile(
        fileName,
        host.readFile(fileName),
        ts.ScriptTarget.Latest
      );
    },
    getSourceFile: (fileName) =>
      ts.createSourceFile(
        fileName,
        host.readFile(fileName),
        ts.ScriptTarget.Latest
      ),
    getEnvironmentVariable: (name: string) => name,
    // getDirectories: () => [],
    // createLanguageServiceHost
    // getCompilerOptions: () => compilerOptions, // Передаем настройки компилятора TypeScript
    // getGlobalTypings: () => "", // Пустой метод, если у вас нет отдельных глобальных типов
    // getGlobalThis: () => globalObject,
  };

  const program = ts.createProgram({
    rootNames: ["code.ts", "test.ts"],
    options: compilerOptions,
    host: host,
  });

  const diagnostics = ts.getPreEmitDiagnostics(program);
  const formatted = ts.formatDiagnostics(diagnostics, {
    getCurrentDirectory: () => "",
    getCanonicalFileName: (fileName) => fileName,
    getNewLine: () => "\n",
  });
  console.log(diagnostics);
  return formatted.split("\n");
};

export default checkTypes;
