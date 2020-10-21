import { renderHook } from "@testing-library/react-hooks";
import { shallowEqual, useSelector } from "react-redux";
import { useShallowEqualSelector } from "../useShallowEqualSelector";

interface RenderProps {
  selector: jest.Mock;
  customizer?: jest.Mock;
}

it("useShallowEqualSelector()", () => {
  const selectorFn = jest.fn();

  const useSelectorReturnedValue = Symbol("useSelector");

  const useSelectorFn = useSelector as jest.Mock;

  useSelectorFn.mockReturnValueOnce(useSelectorReturnedValue);

  const { result } = renderHook<RenderProps, unknown>(
    ({ selector }) => useShallowEqualSelector(selector),
    {
      initialProps: {
        selector: selectorFn,
      },
    }
  );

  expect(result.current).toBe(useSelectorReturnedValue);

  expect(useSelectorFn).toBeCalledTimes(1);
  expect(useSelectorFn).toBeCalledWith(selectorFn, shallowEqual);

  // @todo. need to test that isEqualWith() is called inside useSelector() callback
});
