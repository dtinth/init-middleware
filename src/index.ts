/**
 * Adapts an Express middleware into an async function suitable for
 * use with Next.js API routes.
 *
 * This is taken directly from {@link https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/lib/init-middleware.js}
 *
 * @param middleware - The Express middleware instance
 * @returns An async function that should be called with `(req, res)` to execute the middleware
 * @public
 */
export function initMiddleware<T extends Function>(middleware: T) {
  return (req: any, res: any) =>
    new Promise<any>((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}
