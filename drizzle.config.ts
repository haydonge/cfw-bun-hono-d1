import type { Config } from 'drizzle-kit';

export default {
    dialect: "sqlite", // "mysql" | "sqlite" | "postgresql"  我自己加的
    schema: './src/db/schema.ts',
    out: './drizzle/migrations',
    dbCredentials: {
        url: "4ce62718-7b9a-4d8f-ad8a-740882958516"
    }
  } satisfies Config;
