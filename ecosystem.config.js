module.exports = {
    apps : [{
      name: 'WebAPI',
      script: 'build/index.js',//testing
      watch: false,
      watch_delay: 1000,
      ignore_watch : ["node_modules",".git","", ".github", ],
      watch_options: {
        "followSymlinks": false
      }
    }]
  };