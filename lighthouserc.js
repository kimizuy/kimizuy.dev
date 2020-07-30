module.exports = {
  ci: {
    url: ['http://localhost/'],
    collect: {
      staticDistDir: './out',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
