/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.fbcdn.net'
        },
        {
          protocol: 'https',
          hostname: '**.fna.fbcdn.net'
        },
        {
          protocol: 'https',
          hostname: '**.xx.fbcdn.net'
        }
      ]
    }
  }
  
  module.exports = nextConfig
  