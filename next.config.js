/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
    typedRoutes: true,
},
images: {
    remotePatterns: [
        { hostname: 'res.cloudinary.com', protocol: 'https', port: '' }
    ]
},
 webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true, 
    };
    return config;
  },
}

module.exports = nextConfig
