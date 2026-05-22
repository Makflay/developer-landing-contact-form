import { Router } from "express";
import contactRouts from "./contact.routes";

export const router = Router();

router.use("/contact", contactRouts);
