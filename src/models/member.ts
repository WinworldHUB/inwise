import { Member } from "../types";

export const Members: Member[] = [];

export const getAllMembers = (): Member[] => Members;

export const getMember = (id: string): Member | undefined => {
  if (!id) {
    throw new Error("Member ID is required");
  }
  return Members.find((member) => member.id === id);
};

export const createMember = (member: Member): void => {
  if (!member) {
    throw new Error("Member is required");
  }
  Members.push(member);
};

export const updateMember = (id: string, updatedMember: Member): void => {
  if (!id) {
    throw new Error("Valid member ID is required");
  }
  const index = Members.findIndex((member) => member.id === id);
  if (index === -1) {
    throw new Error("Member not found");
  }
  Members[index] = updatedMember;
};

export const deleteMember = (id: string): void => {
  if (!id) {
    throw new Error("Valid member ID is required");
  }
  const index = Members.findIndex((member) => member.id === id);
  if (index === -1) {
    throw new Error("Member not found");
  }
  Members.splice(index, 1);
};
