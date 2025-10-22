import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import server from "./config/server";
import router from "./routes/userRoutes";
import assignmentsRouter from "./routes/assignmentRoutes";
import TDDCyclesRouter from "./routes/TDDCyclesRoutes";
import groupsRouter from "./routes/groupsRouter";
import submissionsRouter from "./routes/submissionRoutes";
import teacherCommentsOnSubmissionRouter from "./routes/teacherCommentsOnSubmissionsRoutes";
import practicesRouter from "./routes/practicesRoutes";
import practiceSubmissionsRouter from "./routes/practiceSubmissionsRoutes";
import aiAssistantRouter from "./routes/AIAssistant";
import featureFlagsRouter from "./routes/featureFlagsRoutes";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

/* 🧩 CORS Configuration:
   - Permite localhost para desarrollo
   - Permite dominios fijos (UI principal y preview)
   - Permite subdominios dinámicos de vercel.app (para ramas de preview)
*/
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // permite Postman u otros sin origin

      const allowedOrigins = [
        "http://localhost:5173",
        "https://tdd-lab-ui.vercel.app",
        "https://tdd-lab-ui-preview.vercel.app",
      ];

      // Permitir todos los subdominios *.vercel.app (preview environments)
      if (origin.endsWith(".vercel.app") || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("🚫 CORS blocked for origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // necesario para cookies, auth headers
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

/* 🔗 Routes */
app.use("/api/user", router);
app.use("/api/assignments", assignmentsRouter);
app.use("/api/TDDCycles", TDDCyclesRouter);
app.use("/api/groups", groupsRouter);
app.use("/api/submissions", submissionsRouter);
app.use("/api/commentsSubmission", teacherCommentsOnSubmissionRouter);
app.use("/api/practices", practicesRouter);
app.use("/api/practiceSubmissions", practiceSubmissionsRouter);
app.use("/api/AIAssistant", aiAssistantRouter);
app.use("/api/featureFlags", featureFlagsRouter);

/* 🚀 Start Server */
server(app, port);

export default app;
