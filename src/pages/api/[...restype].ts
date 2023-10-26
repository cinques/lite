import { createNextRouter } from "@restype/next";
import { router } from "@/server/api";

const handler = createNextRouter({ nextjsApiRouteName: "restype" }, router);

export default handler;
