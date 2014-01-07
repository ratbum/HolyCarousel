module.exports = (grunt) ->

	# Project configuration.
	grunt.initConfig
		coffee:
			dist:
				expand: true
				cwd: 'coffee'
				src: ['**/*.coffee']
				dest: 'js'
				ext: '.js'
		compress:
			dist:
				options:
					archive: 'plugin.zip'
				files: [
					{
						flatten: true
						cwd: 'dist/'
						src: '*'
						dest: '.'
					}
				]
		copy:
			dist:
				files:[
					{
						expand: true
						src:['./*.html']
						dest: 'dist/'
					}
				]
			test: 
				files:[
					{
						expand: true
						src:['./*.html']
						dest: 'test/'
					},
					{
						expand: true
						src:['*.js']
						cwd:'./js/'
						dest: 'test/'
					}
				]
		sass:
			dist:
				style: 'compact'
				files:
					'dist/main.css': 'scss/main.scss'
			test:
				style: 'nested'
				lineNumbers: true
				files:
					'test/main.css': 'scss/main.scss'
		uglify:
			dist:
				files:
					'dist/jquery.holycarousel.min.js': ['lib/*.js', 'js/*.js']
		watch:
			test:
				files: ['**/*.coffee', '**/*.scss', '*.html']
				tasks: ['test']
	
	# These plugins provide necessary tasks.
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-compress'
	grunt.loadNpmTasks 'grunt-contrib-copy'
	grunt.loadNpmTasks 'grunt-contrib-sass'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-contrib-watch'

	# Default task.
	grunt.registerTask 'dist', ['coffee', 'uglify', 'copy:dist', 'sass:dist', 'compress:dist']
	grunt.registerTask 'default', ['dist']
	grunt.registerTask 'test', ['coffee', 'sass:test', 'copy:test']
