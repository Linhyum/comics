/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ['st.nettruyenus.com', 'nettruyennew.com', 'comics-api.vercel.app', 'nettruyenco.vn'],
      formats: ['image/webp'],
      minimumCacheTTL: 60
   },
   swcMinify: false
}

module.exports = nextConfig
