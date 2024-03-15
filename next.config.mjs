/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: ".next",
    reactStrictMode: false,
    // cleanDistDir: true,
    compiler: {
        styledComponents: {
        // Enabled by default.
        cssProp: true
        }
    },
    images: {
        domains: ['via.placeholder.com'],
    },
};

export default nextConfig;
