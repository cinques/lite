import NextAuth from "next-auth";
import VkProvider from "next-auth/providers/vk";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/server/db";

export default NextAuth({
  providers: [
    VkProvider({
      clientId: process.env.VK_ID,
      clientSecret: process.env.VK_SECRET,
    }),
  ],
  adapter: PrismaAdapter(db),
});
