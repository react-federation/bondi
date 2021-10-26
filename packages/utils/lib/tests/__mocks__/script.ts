import { rest } from "msw";

const jsMock = rest.get("http://test/test-module.js", (_req, res, ctx) => {
  console.log(_req)
  return res(ctx.body("export default ()=>null"), ctx.set("Content-Type", "application/javascript"));
});

export default jsMock;
