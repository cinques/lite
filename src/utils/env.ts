import { z } from "zod";

const envVariables = z.object({
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
  VK_ID: z.string(),
  VK_SECRET: z.string(),
});

envVariables.parse(process.env);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
