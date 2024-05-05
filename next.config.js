/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cloudflare-ipfs.com", "instamint-laym-bucket.s3.eu-west-3.amazonaws.com"]
  }
}

module.exports = nextConfig
