
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
//import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, username } from "better-auth/plugins";

//import { db } from "@/db";
//import * as schema from "@/db/schema";
import { sendEmail } from "@/lib/email"; // Uncomment if you implement email sending

import prisma from "./prisma";

export const auth = betterAuth({/*
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,*/
    database: prismaAdapter(prisma, {
      provider: "postgresql",
    }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false, // não permitir que o usuário defina a role no signup
      },
    },
  },
  emailAndPassword: { 
    enabled: true, 
    requireEmailVerification: true,
    sendResetPassword: async ({user, url}) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    }
  },
  socialProviders: {
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID as string,
      clientSecret: process.env.APPLE_CLIENT_SECRET as string,
      // Optional
      appBundleIdentifier: process.env.APPLE_APP_BUNDLE_IDENTIFIER as string,
    },
  },
  trustedOrigins: ["https://appleid.apple.com"],
  plugins: [admin(), username()],
});
