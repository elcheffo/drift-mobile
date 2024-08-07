module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            events: "eventemitter3",
            crypto: "expo-crypto",
            fs: "./lib/fs",
          },
        },
      ],
    ],
  };
};
