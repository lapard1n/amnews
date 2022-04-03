export const server = (done) => {
  app.plugins.browser.init({
    server: {
      baseDir: app.path.dist.html,
    },
    notify: false,
    port: 5000,
  })
}
