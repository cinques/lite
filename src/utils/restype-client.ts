"use client";

import { createClient } from "@restype/client";
import { contract } from "@/utils/contract";

export const r = createClient(contract, { baseUrl: "/api" });
