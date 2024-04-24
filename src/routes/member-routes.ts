import { Router } from "express";
import {
  getAllMembersHandler,
  getMemberHandler,
  createMemberHandler,
  updateMemberHandler,
  deleteMemberHandler,
  SignupHandler,
  SignInHandler,
  changePasswordHandler,
} from "../controllers/members";

export const memberRouter = Router();

memberRouter.get("/", getAllMembersHandler);
memberRouter.get("/:id", getMemberHandler);
memberRouter.post("/", createMemberHandler);
memberRouter.post("/signup", SignupHandler);
memberRouter.post("/signin", SignInHandler);
memberRouter.post ("/change-password", changePasswordHandler);
memberRouter.put("/:email", updateMemberHandler);
memberRouter.delete("/:id", deleteMemberHandler);
