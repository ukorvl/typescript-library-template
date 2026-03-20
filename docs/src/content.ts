import { stubFunction } from "typescript-library-template";

const getDocumentationIntro = (): string => {
  // Exercise package import resolution exactly as an external consumer would.
  stubFunction();

  return "Run pnpm run setup-repo once, then use docs and example workspace scripts.";
};

export { getDocumentationIntro };
