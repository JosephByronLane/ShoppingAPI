module.exports = {
    apps : [{
      name: 'API',
      script: 'build/index.js',
      watch: false,
      watch_delay: 1000,
      ignore_watch : ["node_modules", "src"],
      watch_options: {
        "followSymlinks": false
      }
    }]
  };