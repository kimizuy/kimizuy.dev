module.exports = {
  ci: {
    url: ['http://localhost/'],
    collect: {
      staticDistDir: './public',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
