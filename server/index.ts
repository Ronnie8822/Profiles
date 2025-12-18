import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { registerRoutes } from "./routes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

/* ------------------ body parsing ------------------ */

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    limit: "10mb",
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

/* ------------------ logger ------------------ */

export function log(message: string, source = "express") {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${time} [${source}] ${message}`);
}

/* ------------------ request logging ------------------ */

app.use((req, res, next) => {
  const start = Date.now();
  const url = req.path;
  let jsonResponse: any;

  const originalJson = res.json;
  res.json = function (body, ...args) {
    jsonResponse = body;
    return originalJson.apply(this, [body, ...args]);
  };

  res.on("finish", () => {
    if (url.startsWith("/api")) {
      log(
        `${req.method} ${url} ${res.statusCode} in ${Date.now() - start}ms` +
          (jsonResponse ? ` :: ${JSON.stringify(jsonResponse)}` : "")
      );
    }
  });

  next();
});

/* ------------------ routes ------------------ */

await registerRoutes(httpServer, app);

/* ------------------ error handler ------------------ */

app.use(
  (err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  }
);

/* ------------------ STATIC FRONTEND (PRODUCTION) ------------------ */

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "..", "dist");

  app.use(express.static(distPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

/* ------------------ LOCAL DEV SERVER ------------------ */

if (process.env.NODE_ENV !== "production") {
  const PORT = parseInt(process.env.PORT || "5000", 10);

  httpServer.listen(PORT, "0.0.0.0", () => {
    log(`dev server running on port ${PORT}`);
  });
}

/* ------------------ EXPORT FOR VERCEL ------------------ */
export default app;
