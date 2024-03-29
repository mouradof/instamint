import * as crypto from "crypto";
import * as util from "util";
import config from "../config";

const pbkdf2 = util.promisify(crypto.pbkdf2);

const hashPassword = async (password: string): Promise<[string, string]> => {
  const salt: string = crypto.randomBytes(config.security.password.saltlen).toString("hex");
  const hashedPassword = await pbkdf2(
    `${password}${config.security.password.pepper}`,
    salt,
    config.security.password.iterations,
    config.security.password.keylen,
    config.security.password.digest
  );
  
  return [hashedPassword.toString("hex"), salt];
};

export default hashPassword;
