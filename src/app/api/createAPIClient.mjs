import config from "./config.mjs"
import axios from "axios"

const createAPIClient = ({ jwt, apiKey }) => {
  const apiConfig = config[apiKey]

  const client = axios.create({
    baseURL: apiConfig.baseURL,
    timeout: apiConfig.timeout,
    headers: {
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
      ...apiConfig.defaultHeaders
    }
  })

  return client
}

export default createAPIClient
