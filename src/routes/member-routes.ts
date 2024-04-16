import { Router } from "express";
import { getAllMembersHandler, getMemberHandler, createMemberHandler } from "../controllers/members";

export const memberRouter = Router();

memberRouter.get("/", getAllMembersHandler);
memberRouter.get("/:id", getMemberHandler);
memberRouter.post("/", createMemberHandler);