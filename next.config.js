const withSourceMaps = require("@zeit/next-source-maps");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(
  withSourceMaps({
    webpack(config) {
      return config;
    },
  })
);
