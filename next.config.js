module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      {
        test: /\.(glsl|frag|vert)$/,
        use: [
            require.resolve('raw-loader'),
            require.resolve('glslify-loader'),
        ]
    });

    // Important: return the modified config
    return config
  },
};
