module.exports = {
    apps : [{
      name: 'WebAPI',
      script: 'build/index.js',//testing
      watch: true,
      watch_delay: 1000,
      ignore_watch : ["node_modules", "src"],
      watch_options: {
        "followSymlinks": false
      }
    }]
  };