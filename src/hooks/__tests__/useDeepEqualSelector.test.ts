import { renderHook } from "@testing-library/react-hooks";
import { useSelector } from "react-redux";
import { isEqualWith } from "lodash";
import { useDeepEqualSelector } from "../useDeepEqualSelector";

jest.mock("react-redux");
jest.mock("lodash");

interface RenderProps {
  selector: jest.Mock;
  customizer?: jest.Mock;
}

it("useDeepEqualSelector()", () => {
  const selectorFn = jest.fn();
  const customerFn = jest.fn();

  const useSelectorReturnedValue = Symbol("useSelector");

  const useSelectorFn = useSelector as jest.Mock;

  const left = Symbol("left");
  const right = Symbol("right");

  useSelectorFn.mockImplementationOnce((_selector, equalityFn) => {
    equalityFn(left, right);

    return useSelectorReturnedValue;
  });

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

  const isEqualWithFn = isEqualWith as jest.Mock;

  expect(isEqualWithFn).toBeCalledTimes(1);
  expect(isEqualWithFn).toBeCalledWith(left, right, customerFn);
});
