import { describe, it, expect } from "vite-plus/test";
import { initMiddleware } from "./index.ts";

describe("initMiddleware", () => {
  it("wraps middleware in a promise", async () => {
    const middleware = (req: any, res: any, next: any) => {
      next();
    };

    const handler = initMiddleware(middleware);
    const result = await handler({}, {});

    expect(result).toBeUndefined();
  });

  it("resolves with callback result", async () => {
    const middleware = (req: any, res: any, next: any) => {
      next("success");
    };

    const handler = initMiddleware(middleware);
    const result = await handler({}, {});

    expect(result).toBe("success");
  });

  it("rejects when callback receives an error", async () => {
    const testError = new Error("middleware error");
    const middleware = (req: any, res: any, next: any) => {
      next(testError);
    };

    const handler = initMiddleware(middleware);

    await expect(handler({}, {})).rejects.toThrow("middleware error");
  });

  it("passes req and res to middleware", async () => {
    const req = { method: "GET" };
    const res = { statusCode: 200 };
    let capturedReq: any;
    let capturedRes: any;

    const middleware = (req: any, res: any, next: any) => {
      capturedReq = req;
      capturedRes = res;
      next();
    };

    const handler = initMiddleware(middleware);
    await handler(req, res);

    expect(capturedReq).toBe(req);
    expect(capturedRes).toBe(res);
  });
});
