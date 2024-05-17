const config = {
  apiUser: {
    baseURL: "http://localhost:4000",
    timeout: 5000,
    retryAttempts: 3,
    defaultHeaders: {
      "Content-Type": "application/json"
    }
  },
  apiRelation: {
    baseURL: "http://localhost:4001",
    timeout: 5000,
    retryAttempts: 3,
    defaultHeaders: {
      "Content-Type": "multipart/form-data"
    }
  },
  apiPost: {
    baseURL: "http://localhost:4002",
    timeout: 5000,
    retryAttempts: 3,
    defaultHeaders: {
      "Content-Type": "application/json"
    }
  },
  apiNotification: {
    baseURL: "http://localhost:4003",
    timeout: 5000,
    retryAttempts: 3,
    defaultHeaders: {
      "Content-Type": "application/json"
    }
  },
  apiNFT: {
    baseURL: "http://localhost:4004",
    timeout: 5000,
    retryAttempts: 3,
    defaultHeaders: {
      "Content-Type": "application/json"
    }
  }
}

export default config
