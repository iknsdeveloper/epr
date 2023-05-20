/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
},
images: {
    remotePatterns: [
        { hostname: 'res.cloudinary.com', protocol: 'https', port: '' }
    ]
},
 webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true, // enable top-level-await experiment
    };
    return config;
  },
}

module.exports = nextConfig
