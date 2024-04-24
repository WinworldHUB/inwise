import express, { RequestHandler } from "express";

import { Member, CompanyRole, CreateMemberInput } from "../awsApis";
import awsExport from "../amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { createMember } from "../graphql/mutations";
import { SignInInput, SignUpInput, confirmSignIn, confirmSignUp, signIn, signUp } from "aws-amplify/auth";
import { isValidMember } from "../utils/member-util";
import { Credentials } from "../types";
Amplify.configure(awsExport);

const client = generateClient();
export const getAllMembersHandler: RequestHandler = (req, res, next) => {};

export const getMemberHandler: RequestHandler = (req, res, next) => {};

export const createMemberHandler: RequestHandler = (req, res, next) => {};

export const updateMemberHandler: RequestHandler = (req, res, next) => {};

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
      return res.status(200).json({ message: "Sign in Successful", memberSignInDetails });
    } else {
      return res.status(500).json({ message: "Failed to sign in member", });
    }

  } catch (error) {
    res.status(500).json({ message: "Cannot login, please try again later" });
  }
};
