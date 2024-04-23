import { Member } from "../awsApis";

// Function to validate member object
export const isValidMember = (member:Member) => {
    return (
      member &&
      member.name &&
      typeof member.isActive === "boolean" &&
      member.role &&
      member.email
    );
  };