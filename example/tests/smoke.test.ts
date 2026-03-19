import { describe, expect, it } from "vitest";

import { runLibraryExample } from "../src/index.js";

describe("example workspace smoke", () => {
  it("uses the library workspace package", () => {
    expect(runLibraryExample()).toBe("ok");
  });
});
