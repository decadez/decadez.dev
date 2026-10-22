export type LintDiagnostic = {
  line: number;
  column: number;
  severity: "warning" | "error";
  message: string;
}[];

export const useSandpackLint = () => {
  return { lintErrors: [] as LintDiagnostic, lintExtensions: [] as unknown[] };
};
