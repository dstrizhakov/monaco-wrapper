import * as ts from "typescript";

export function createLanguageServiceHost(
  ts: typeof import("typescript"),
  compilerOptions: ts.CompilerOptions,
  testPaths: string[]
): ts.LanguageServiceHost {
  let version = 0;
  return {
    directoryExists: ts.sys.directoryExists,
    getCompilationSettings: () => compilerOptions,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getDefaultLibFileName: () => require.resolve("typescript/lib/lib.d.ts"),
    getNewLine: () => ts.sys.newLine,
    getScriptFileNames: () => testPaths,
    fileExists: ts.sys.fileExists,
    getDirectories: ts.sys.getDirectories,
    getScriptSnapshot: (fileName) =>
      ts.ScriptSnapshot.fromString(ts.sys.readFile(ensureExists(fileName))!),
    getScriptVersion: () => (version++).toString(),
  };
}
