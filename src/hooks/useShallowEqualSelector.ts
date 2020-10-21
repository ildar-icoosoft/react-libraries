import { useSelector, shallowEqual, DefaultRootState } from "react-redux";

export function useShallowEqualSelector<
  TState = DefaultRootState,
  TSelected = unknown
>(selector: (state: TState) => TSelected) {
  return useSelector(selector, shallowEqual);
}
