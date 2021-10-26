import "./config/webpack-mock";
import { fireEvent } from "@testing-library/dom";
import importModule, { injectModuleInDOM } from "../import-module";

beforeAll(() => {
  const scopeData = {
    init: jest.fn().mockResolvedValue(undefined),
    get: jest.fn().mockResolvedValue(() => ({ default: "default-export" })),
  };
  // @ts-ignore
  window.a = scopeData;
});

afterEach(() => {
  const script = document.querySelector("script");

  script?.parentElement?.removeChild(script);
});

describe("importModule", () => {
  test("should return the loaded module", async () => {
    setTimeout(() => {
      fireEvent.load(document.querySelector("script") as Node);
    }, 100);

    const importedModule = await importModule<{ default: string }>({ scope: "a", module: "b", url: "c" });
    expect(importedModule).toHaveProperty("default");
    expect(importedModule.default).toBe("default-export");
  });

  test("should throw an error when the scope doesn't exists", async () => {
    importModule<{ default: string }>({ scope: "b", module: "b", url: "c" }).catch((error) => {
      expect(error).toBeInstanceOf(Error);
    });
  });
});

describe("injectModuleInDOM", () => {
  test("should return the event after the script is ready", async () => {
    const script = injectModuleInDOM("/");
    const node = document.querySelector("script") as HTMLScriptElement;

    fireEvent.load(node);

    script.then((event) => {
      expect(event).toBeInstanceOf(UIEvent);
    });
  });

  test("should set the error boolean if the load fails", async () => {
    const script = injectModuleInDOM("/");

    const node = document.querySelector("script") as Node;

    fireEvent.error(node);

    script.catch((event) => {
      expect(event).toBeInstanceOf(Event);
    });
  });
});
