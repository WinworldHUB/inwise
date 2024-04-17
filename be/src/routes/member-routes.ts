import { Router } from "express";
import {
  getAllMembersHandler,
  getMemberHandler,
  createMemberHandler,
  updateMemberHandler,
  deleteMemberHandler,
} from "../controllers/members";

export const memberRouter = Router();

memberRouter.get("/", getAllMembersHandler);
memberRouter.get("/:id", getMemberHandler);
memberRouter.post("/", createMemberHandler);
memberRouter.put("/:id", updateMemberHandler);
memberRouter.delete("/:id", deleteMemberHandler);
