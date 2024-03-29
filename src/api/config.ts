import * as dotenv from "dotenv"
import { resolve } from "node:path"
import knexfile from "../../knexfile"
dotenv.config({ path: resolve(".env.local") })

interface SecurityConfig {
  saltlen: number;
  keylen: number;
  iterations: number;
  digest: string;
  pepper: string | undefined;
}

interface Config {
  port: number;
  db: unknown;
  security: {
    password: SecurityConfig;
  };
}

const config: Config = {
  port: 3000,
  db: knexfile,
  security: {
    password: {
      saltlen: 512,
      keylen: 512,
      iterations: 100000,
      digest: "sha512",
      pepper: process.env.SECURITY__PASSWORD__PEPPER,
    },
  },
}

export default config
