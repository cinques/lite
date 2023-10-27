import NextAuth from "next-auth";
import VkProvider from "next-auth/providers/vk";

export const authOptions = {
  providers: [
    VkProvider({
      clientId: process.env.VK_ID,
      clientSecret: process.env.VK_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
