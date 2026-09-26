import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// Only the jsdom-environment component tests actually render anything, but
// this is harmless to run for every test file — cleanup() is a no-op when
// nothing was rendered.
afterEach(() => {
  cleanup();
});
