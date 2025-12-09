import "dotenv/config";
import cors from "cors";
import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
// @ts-ignore - connect-pg-simple doesn't have types
import connectPgSimple from "connect-pg-simple";
import { registerRoutes } from "./routes";
import { setupClientProxy, log } from "./client-proxy";
import { createSumsubClient, DemoSumsubClient } from "./sumsub";
import "dotenv/config";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Allow requests from your frontend origin
// Configured allowed origins for CORS
const allowedOrigins = [
  'https://comforting-paletas-589a05.netlify.app',
  'http://localhost:5173', // Vite dev server
  'http://localhost:3000', // Alternative dev port
];

app.use(
  cors({  
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // In development, allow all origins for flexibility
        if (process.env.NODE_ENV === 'development') {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    },
    credentials: true,
  })
);

// Initialize Sumsub client and attach to app
const sumsubClient = createSumsubClient();
if (sumsubClient) {
  app.set('sumsubClient', sumsubClient);
  if (sumsubClient instanceof DemoSumsubClient) {
    log('Sumsub client initialized (DEMO mode)');
  } else {
    // Mask for logging
    const mask = (s: string | undefined) => s ? `${s.slice(0,6)}...${s.slice(-6)}` : '<empty>';
    log(`Sumsub client initialized (appToken=${mask(process.env.SUMSUB_APP_TOKEN)})`);
  }
} else {
  log('Sumsub integration not configured (set SUMSUB_APP_TOKEN and SUMSUB_SECRET_KEY)');
}

// Validate session secret in production
if (process.env.NODE_ENV === 'production' && !process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET environment variable is required in production');
}

// Configure session store - use PostgreSQL for production (serverless compatibility)
// For Supabase, we can use the connection string from SUPABASE_URL
let sessionStore: any = undefined;

if (process.env.DATABASE_URL) {
  // Use PostgreSQL session store if DATABASE_URL is available
  const PgSession = connectPgSimple(session);
  sessionStore = new PgSession({
    conString: process.env.DATABASE_URL,
    tableName: 'session', // Table name for sessions
    createTableIfMissing: true, // Auto-create table if it doesn't exist
  });
  log('Using PostgreSQL session store');
} else if (process.env.SUPABASE_DB_URL) {
  // Use Supabase direct database connection URL if provided
  // Format: postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
  const PgSession = connectPgSimple(session);
  sessionStore = new PgSession({
    conString: process.env.SUPABASE_DB_URL,
    tableName: 'session',
    createTableIfMissing: true,
  });
  log('Using Supabase PostgreSQL session store');
} else {
  log('WARNING: No database connection found. Using memory session store.');
  log('Sessions will not persist in serverless environments. Set DATABASE_URL or SUPABASE_URL with SUPABASE_DB_PASSWORD.');
}

// Configure session middleware
// Determine if we need cross-origin cookie settings
const isProduction = process.env.NODE_ENV === 'production';
const frontendUrl = process.env.FRONTEND_URL || allowedOrigins[0];
const isCrossOrigin = isProduction && frontendUrl && !frontendUrl.includes('localhost');

const sessionConfig: session.SessionOptions = {
  secret: process.env.SESSION_SECRET || 'dev-only-secret-' + Math.random().toString(36),
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: isProduction, // Must be true for sameSite: 'none'
    httpOnly: true,
    maxAge: 3600000, // 1 hour
    sameSite: isCrossOrigin ? 'none' : 'lax', // 'none' for cross-site, 'lax' for same-site
  }
};

if (isCrossOrigin) {
  log('Configured session cookies for cross-origin (sameSite: none, secure: true)');
}

app.use(session(sessionConfig));

// Extend express session type
declare module 'express-session' {
  interface SessionData {
    donorAuth?: {
      tagCode: string;
      beneficiaryName: string;
    };
    userAuth?: {
      userId: string;
      email: string;
      fullName: string;
    };
    philanthropistAuth?: {
      philanthropistId: string;
      email: string;
    };
    beneficiary?: {
      tagCode: string;
    };
  }
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {


    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup client proxy in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  // In development the client is intended to be run separately and the server will
  // proxy non-API requests to the dev client (or you can run the client dev server independently).
  await setupClientProxy(app, server);

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '3000', 10);
  server.listen({
    port:3000,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
