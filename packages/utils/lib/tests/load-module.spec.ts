import "./config/webpack-mock";
import loadModule from "../load-module";

const scopeData = {
  init: jest.fn().mockResolvedValue(undefined),
  get: jest.fn().mockResolvedValue(() => ({ _esModule: true })),
};

// @ts-ignore
window.a = scopeData;

describe("loadModule", () => {
  test("should return a module from the webpack context", async () => {
    const result = await loadModule({ scope: "a", module: "b" })();

    expect(result).toEqual({ _esModule: true });
    // @ts-ignore
    expect(window.a.init).toBeCalled();
  });

  test("should throw an error when the passed scope doesn't exists", async () => {
    loadModule({ scope: "b", module: "b" })().catch((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        'the namespace/scope b doesn\'t exists, check the "name" key in your module federation config'
      );
    });
  });

  test("should throw an error when there's no modules in the default share scope", async () => {
    // @ts-ignore
    global.__webpack_init_sharing__ = () => {
      throw Error();
    };

    loadModule({ scope: "a", module: "b" })().catch((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        `make sure that you have modules shared in the "default" share scope (webpackConfig.shared[moduleName].shareScope = "default")`
      );
    });
  });
});
