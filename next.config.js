// next.config.js
const { parsed: localEnv } = require("dotenv").config()
const webpack = require("webpack")

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cloudflare-ipfs.com", "instamint-laym-bucket.s3.eu-west-3.amazonaws.com", "loremflickr.com"]
  },
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))

    return config
  }
}

module.exports = nextConfig
