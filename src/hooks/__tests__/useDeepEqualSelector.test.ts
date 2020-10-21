import { renderHook } from "@testing-library/react-hooks";
import { useSelector } from "react-redux";
import { useDeepEqualSelector } from "../useDeepEqualSelector";

jest.mock("react-redux");

interface RenderProps {
  selector: jest.Mock;
  customizer?: jest.Mock;
}

it("useDeepEqualSelector()", () => {
  const selectorFn = jest.fn();
  const customerFn = jest.fn();

  const useSelectorReturnedValue = Symbol("useSelector");

  const useSelectorFn = useSelector as jest.Mock;

  useSelectorFn.mockReturnValueOnce(useSelectorReturnedValue);

  const { result } = renderHook<RenderProps, unknown>(
    ({ selector, customizer }) => useDeepEqualSelector(selector, customizer),
    {
      initialProps: {
        selector: selectorFn,
        customizer: customerFn,
      },
    }
  );

  expect(result.current).toBe(useSelectorReturnedValue);

  expect(useSelectorFn).toBeCalledTimes(1);
  expect(useSelectorFn).toBeCalledWith(selectorFn, expect.anything());

  // @todo. need to test that isEqualWith() is called inside useSelector() callback
});
