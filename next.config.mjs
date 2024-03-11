/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: ".next",
    // cleanDistDir: true,
    compiler: {
        styledComponents: {
        // Enabled by default.
        cssProp: true
        }
    },
};

export default nextConfig;
