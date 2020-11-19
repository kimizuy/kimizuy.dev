module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      startServerCommand: 'npm run start',
      url: ['http://localhost:3000/'],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
