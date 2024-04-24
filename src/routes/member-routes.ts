import { Router } from "express";
import {
  getAllMembersHandler,
  getMemberHandler,
  createMemberHandler,
  updateMemberHandler,
  deleteMemberHandler,
  SignupHandler,
  SignInHandler,
} from "../controllers/members";

export const memberRouter = Router();

memberRouter.get("/", getAllMembersHandler);
memberRouter.get("/:id", getMemberHandler);
memberRouter.post("/", createMemberHandler);
memberRouter.post("/signup", SignupHandler);
memberRouter.post("/signin", SignInHandler);
memberRouter.put("/:id", updateMemberHandler);
memberRouter.delete("/:id", deleteMemberHandler);
