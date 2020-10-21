import { isEqualWith, IsEqualCustomizer } from "lodash";
import { useSelector, DefaultRootState } from "react-redux";

export function useDeepEqualSelector<
  TState = DefaultRootState,
  TSelected = unknown
>(selector: (state: TState) => TSelected, customizer?: IsEqualCustomizer) {
  return useSelector(selector, (left: TSelected, right: TSelected) =>
    isEqualWith(left, right, customizer)
  );
}
