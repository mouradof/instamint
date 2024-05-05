import { pbkdf2 as pbkdf2Callback, randomBytes } from "crypto"
import { promisify } from "util"
import config from "../../config.js"

const pbkdf2 = promisify(pbkdf2Callback)

const hashPassword = async (password, salt = randomBytes(config.security.password.saltlen).toString("hex")) => {
  const derivedKey = await pbkdf2(
    `${password}${config.security.password.pepper}`,
    salt,
    config.security.password.iterations,
    config.security.password.keylen,
    config.security.password.digest
  )

  return [derivedKey.toString("hex"), salt]
}

export default hashPassword
