import { MODULES, StepAssertion } from "./curriculum";

export interface TestResult {
  id: string;
  description: string;
  hint: string;
  passed: boolean;
}

export interface StepEvaluation {
  stepId: number;
  totalTests: number;
  passedTests: number;
  allPassed: boolean;
  results: TestResult[];
}

export function evaluateStep(stepId: number, html: string, css: string): StepEvaluation {
  const currentModule = MODULES.find((m) => m.id === stepId);
  if (!currentModule || currentModule.assertions.length === 0) {
    return {
      stepId,
      totalTests: 0,
      passedTests: 0,
      allPassed: true,
      results: [],
    };
  }

  // Parse HTML into a detached DOM document safely on client or server
  let doc: Document;
  if (typeof window !== "undefined" && typeof DOMParser !== "undefined") {
    const parser = new DOMParser();
    doc = parser.parseFromString(html || "", "text/html");
  } else {
    // Minimal mock for server environments if evaluated SSR
    doc = {
      querySelector: () => null,
      querySelectorAll: () => [] as unknown as NodeListOf<Element>,
    } as unknown as Document;
  }

  const results: TestResult[] = currentModule.assertions.map((assertion: StepAssertion) => {
    let passed = false;
    try {
      passed = assertion.check(html || "", css || "", doc);
    } catch {
      passed = false;
    }
    return {
      id: assertion.id,
      description: assertion.description,
      hint: assertion.hint,
      passed,
    };
  });

  const passedTests = results.filter((r) => r.passed).length;
  const allPassed = passedTests === results.length;

  return {
    stepId,
    totalTests: results.length,
    passedTests,
    allPassed,
    results,
  };
}
