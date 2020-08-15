module.exports = {
  ci: {
    collect: {
      staticDistDir: './out',
      url: '/index.html',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
