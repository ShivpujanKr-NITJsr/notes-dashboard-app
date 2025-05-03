import express from "express";

import authRoutes from "./auth/auth.route.js";
import noteRoutes from "./notes/notes.routes.js"
import { userAuth } from "../../../middleware/auth/userAuth.middleware.js";


const app = express();

app.use('/auth', authRoutes);
app.use('/notes',userAuth, noteRoutes);

export default app;