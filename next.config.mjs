import createNextIntlPlugin from "next-intl/plugin";
import bundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["puppeteer-core"],
    },
    trailingSlash: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.map$/,
            use: "ignore-loader",
        });
        return config;
    },
};

// Bundle analyzer
const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

export default withNextIntl(withBundleAnalyzer(nextConfig));
