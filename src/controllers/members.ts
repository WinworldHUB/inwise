import express, { RequestHandler } from "express";
import {
  Members,
  getMember,
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../models/member";

export const getAllMembersHandler: RequestHandler = (req, res, next) => {
  const members = getAllMembers();
  if (!members) {
    res.status(500).json({ message: "No members found" });
  }
  res.status(200).json(members);
};

export const getMemberHandler: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: "Member ID is required" });
  }
  const member = getMember(id);
  if (!member) {
    res.status(500).json({ message: "Member not found" });
  }
  res.status(200).json(member);
};

export const createMemberHandler: RequestHandler = (req, res, next) => {
  const member = req.body;
  if (!member) {
    res.status(400).json({ message: "Member is required" });
  }
  createMember(member);
  res.status(201).json({ message: "Member created successfully", member });
};

export const updateMemberHandler: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  const member = req.body;
  if (!id) {
    res.status(400).json({ message: "Valid member ID is required" });
  }
  if (!member) {
    res.status(400).json({ message: "Member is required" });
  }
  updateMember(id, member);
  res.status(200).json({ message: "Member updated successfully", member });
};

export const deleteMemberHandler: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: "Valid member ID is required" });
  }
  deleteMember(id);
  res.status(200).json({ message: "Member deleted successfully" });
};
