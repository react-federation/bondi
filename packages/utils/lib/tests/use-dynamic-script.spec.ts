import { fireEvent } from "@testing-library/dom";
import { act, renderHook } from "@testing-library/react-hooks";

import useDynamicScript from "../use-dynamic-script";

describe("useDynamicScript", () => {
  test("should set the error boolean if the load fails", async () => {
    const { result } = renderHook(() => useDynamicScript({ url: "http://test/test-module.js" }));
    const script = document.head.querySelector("script") as HTMLScriptElement;

    act(() => {
      fireEvent.error(script);
    });

    expect(result.current.failed).toBe(true);
  });
  test("should set the ready boolean if everything is ok", async () => {
    const { result } = renderHook(() => useDynamicScript({ url: "http://test/test-module.js" }));
    const script = document.head.querySelector("script") as HTMLScriptElement;

    act(() => {
      fireEvent.load(script);
    });

    expect(result.current.ready).toBe(true);
  });

  test("should throw an error when the no url is passed", async () => {
    // @ts-ignore
    const {result} = renderHook(() => useDynamicScript({}));
    expect(result.error).toBeInstanceOf(TypeError)
  });
});
