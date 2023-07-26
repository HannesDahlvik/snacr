const { env } = require('@snacr/env')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ['@snacr/api', '@snacr/db']
}

module.exports = nextConfig
