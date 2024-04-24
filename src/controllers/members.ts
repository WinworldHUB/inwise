import express, { RequestHandler } from "express";

import { Member, CompanyRole, CreateMemberInput } from "../awsApis";
import awsExport from "../amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { createMember, updateMember } from "../graphql/mutations";
import {
  SignInInput,
  SignUpInput,
  confirmSignIn,
  confirmSignUp,
  signIn,
  signUp,
  updatePassword,
} from "aws-amplify/auth";
import { isValidMember } from "../utils/member-util";
import { ChangePasswordRequest, Credentials } from "../types";
import { getMember, listMembers } from "../graphql/queries";
Amplify.configure(awsExport);

const client = generateClient();

export const getAllMembersHandler: RequestHandler = async (req, res, next) => {
  try {
    const members = await client.graphql({
      query: listMembers,
      variables: {
        filter: {
          isActive: {
            eq: true,
          },
        },
      },
    });

    if (!members.data.listMembers.items) {
      res.status(404).json({ error: "No members found" });
      return;
    }

    res.json(members.data.listMembers.items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve members" });
  }
};

export const getMemberHandler: RequestHandler = async (req, res, next) => {
  try {
    const members = await client.graphql({
      query: getMember,
      variables: {
        id: req.params.id,
      },
    });

    res.json(members.data.getMember);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve members" });
  }
};

export const getMemberByEmail: RequestHandler = async (req, res, next) => {
  try {
    const email = req.params.email.toLowerCase();
    if (!email) {
      res.status(400).json({ error: "Email parameter missing" });
      return;
    }
    const members = await client.graphql({
      query: listMembers,
      variables: {
        filter: {
          email: { eq: email },
        },
      },
    });
    if (!members.data.listMembers.items) {
      res.status(404).json({ error: "No member found" });
      return;
    }
    res.json(members.data.listMembers.items[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve members" });
  }
};

export const createMemberHandler: RequestHandler = async (req, res, next) => {
  try {
    const member = req.body as Member;
    member.email = member.email.toLowerCase();
    if (member) {
      const newMember = await client.graphql({
        query: createMember,
        variables: {
          input: member,
        },
      });

      const createdMember = newMember.data.createMember;
      if (!createdMember) {
        return res.status(500).send({
          status: "failed",
          message: "Error saving member",
        });
      }
      res.json(createdMember);
    }
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: "Error saving member",
      internalError: error,
    });
  }
};

export const updateMemberHandler: RequestHandler = async (req, res, next) => {
  try {
    const email = req.params.email;
    const requestBody = req.body;
    if (email) {
      const foundMember = await client.graphql({
        query: listMembers,
        variables: {
          filter: {
            email: { eq: email },
          },
        },
      });

      if (foundMember && foundMember.data.listMembers.items.length > 0) {
        const memberToUpdate = foundMember.data.listMembers.items[0];

        const input = {
          ...requestBody,
        };

        const updatedMember = await client.graphql({
          query: updateMember,
          variables: {
            input: input,
            condition: { email: { eq: memberToUpdate.email } },
          },
        });

        res.json(updatedMember.data.updateMember);
      } else {
        res.status(404).json({ error: "Member not found" });
      }
    } else {
      res.status(400).json({ error: "Email parameter missing" });
    }
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: "Error updating member",
      internalError: error,
    });
  }
};

export const deleteMemberHandler: RequestHandler = (req, res, next) => {};

export const SignupHandler: RequestHandler = async (req, res, next) => {
  try {
    const member: Member = req.body;

    // Check if member object is valid
    if (!isValidMember(member)) {
      return res.status(400).json({ message: "Invalid member data" });
    }

    // Ensure email is in lowercase
    member.email = member.email.toLowerCase();

    // Sign up the member
    const signUpDetails: SignUpInput = {
      username: member.email,
      password: "Password@1",
      options: {
        autoSignIn: true,
        userAttributes: {
          email: member.email,
          name: member.name,
        },
      },
    };
    const memberSignUpDetails = await signUp(signUpDetails);

    // Handle sign up success
    if (memberSignUpDetails) {
      const newMember = {
        ...member,
        id: memberSignUpDetails.userId,
      };

      // Create the member in the database
      const createdMember = await client.graphql({
        query: createMember,
        variables: {
          input: newMember,
        },
      });

      const newMemberCreated = createdMember.data.createMember;
      return res
        .status(201)
        .json({ message: "Sign up Successful", newMemberCreated });
    } else {
      // Handle sign up failure
      return res.status(500).json({ message: "Failed to sign up member" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Cannot sign up, please try again later" });
  }
};

export const SignInHandler: RequestHandler = async (req, res, next) => {
  try {
    const { email, password }: Credentials = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const signInDetails: SignInInput = {
      username: email.toLowerCase(),
      password,
    };

    // Sign in the member
    const memberSignInDetails = await signIn(signInDetails);
    if (memberSignInDetails) {
      return res
        .status(200)
        .json({ message: "Sign in Successful", memberSignInDetails });
    } else {
      return res.status(500).json({ message: "Failed to sign in member" });
    }
  } catch (error) {
    res.status(500).json({ message: "Cannot login, please try again later" });
  }
};

export const changePasswordHandler: RequestHandler = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body as ChangePasswordRequest;
    if (!oldPassword || !newPassword) {
      res.status(400).json({ err: "Invalid old Password ornew Password" });
      return;
    }
    const changePassword = await updatePassword({ oldPassword, newPassword });
    res.status(200).json({ message: "Password changed successfully", changePassword });
  } catch (error) {
    res.status(500).json({ err: "Failed to change password", error });
  }
};
