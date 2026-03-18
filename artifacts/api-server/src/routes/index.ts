import { Router, type IRouter } from "express";
import healthRouter from "./health";
import schemesRouter from "./schemes";
import chatRouter from "./chat";
import ttsRouter from "./tts";

const router: IRouter = Router();

router.use(healthRouter);
router.use(schemesRouter);
router.use(chatRouter);
router.use(ttsRouter);

export default router;
