/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
    API_BASE_URL: 'http://localhost:8080/api/v1',
  },
};

export default nextConfig;
