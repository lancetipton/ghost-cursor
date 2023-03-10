// ts-ignore
module.exports = {
  launch: {
    // dumpio no longer exist in playwright
    logger: {
      // @ts-ignore
      isEnabled: (name, severity) => true,
      log: (name, severity, message, args) => console.debug(`${severity} ${name} ${message} ${args}`)
    },
    headless: true,
    product: 'chrome'
  },
  browserContext: 'default'
}
