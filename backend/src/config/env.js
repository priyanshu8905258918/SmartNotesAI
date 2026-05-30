import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

// Helper to preprocess environment variables to convert empty strings to undefined
const preprocessEmptyStringToUndefined = z.preprocess(
  (val) => (val === '' ? undefined : val),
  z.string().url().optional()
);

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  MONGO_URI: preprocessEmptyStringToUndefined,
  MONGODB_URI: preprocessEmptyStringToUndefined,
  JWT_SECRET: z.string().min(8, "JWT_SECRET must be at least 8 characters"),
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required"),
  FRONTEND_URL: preprocessEmptyStringToUndefined,
  CLIENT_URL: preprocessEmptyStringToUndefined,
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
})
.refine((data) => data.MONGO_URI || data.MONGODB_URI, {
  message: "Either MONGO_URI or MONGODB_URI must be provided",
  path: ["MONGODB_URI"],
})
.refine((data) => {
  if (data.NODE_ENV === 'production') {
    return data.FRONTEND_URL || data.CLIENT_URL;
  }
  return true;
}, {
  message: "Either FRONTEND_URL or CLIENT_URL must be provided in production",
  path: ["FRONTEND_URL"],
})
.transform((data) => {
  const rawFrontend = data.FRONTEND_URL || data.CLIENT_URL || "http://localhost:5173";
  const frontendUrl = rawFrontend.endsWith('/') ? rawFrontend.slice(0, -1) : rawFrontend;
  
  const rawMongo = data.MONGODB_URI || data.MONGO_URI;

  return {
    ...data,
    MONGODB_URI: rawMongo,
    MONGO_URI: rawMongo,
    FRONTEND_URL: frontendUrl,
    CLIENT_URL: frontendUrl,
  };
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Environment validation failed:', parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
