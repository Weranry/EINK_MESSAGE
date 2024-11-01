module.exports = {
  build: ({ entrypoint }) => ({
    runtime: 'custom-runtime@1.0.0',
    handler: entrypoint,
    environment: {},
  }),
};