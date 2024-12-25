/** @type {import('next').NextConfig} */
const nextConfig = {
 // reactStrictMode : false ,
 logging: {
  fetches: {
    fullUrl: true,
  },
},
    images: {
        domains: ['utfs.io','static.zara.net','www.zara.com'], // Add your image domain here
      },
};

export default nextConfig;
