import {
  useCombinedRefs,
  useDeepEqualSelector,
  usePrevious,
  usePreviousDifferent,
  useShallowEqualSelector,
} from "../index";

describe("index", () => {
  it("should export hooks", () => {
    expect(useCombinedRefs).toBeDefined();
    expect(useDeepEqualSelector).toBeDefined();
    expect(usePrevious).toBeDefined();
    expect(usePreviousDifferent).toBeDefined();
    expect(useShallowEqualSelector).toBeDefined();
  });
});
