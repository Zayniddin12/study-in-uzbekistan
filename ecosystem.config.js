module.exports = {
  apps: [
    {
      name: "Study In Uzbekistan",
      port: 3001,
      exec_mode: "cluster",
      instances: "1",
      script: "./.output/server/index.mjs",
      args: "preview",
    },
  ],
};
