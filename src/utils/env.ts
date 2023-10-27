import { z } from "zod";

const envVariables = z.object({
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
  VK_ID: z.string(),
  VK_SECRET: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
