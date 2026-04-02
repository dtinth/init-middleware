# init-middleware

Next.js’s [init-middleware.js](https://github.com/vercel/next.js/blob/86160a5/examples/api-routes-cors/lib/init-middleware.js) published as an npm package.

## Example: CORS

```typescript
import { initMiddleware } from "init-middleware";
import cors from "cors";

const corsMiddleware = initMiddleware(cors({ methods: ["GET", "POST"] }));

export default async function handler(req, res) {
  await corsMiddleware(req, res);

  res.status(200).json({ message: "Hello World" });
}
```

## API reference

<https://apiref.page/package/init-middleware>

[![API reference screenshot](https://ss.dt.in.th/api/screenshots/apiref-init-middleware.png)](https://apiref.page/package/init-middleware)
