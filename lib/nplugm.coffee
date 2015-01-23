_ = require('lodash')
fs = require('fs')
path = require('path')
yeoman = require('yeoman-environment')
glob = require('glob')
Plugin = require('./plugin')

exports.getNpmPaths = ->
	return yeoman.createEnv().getNpmPaths()

exports.getPluginsPathsByGlob = (nameGlob) ->

	if not nameGlob?
		throw new Error('Missing glob')

	if not _.isString(nameGlob)
		throw new Error('Invalid glob')

	npmPaths = exports.getNpmPaths()
	result = []

	for npmPath in npmPaths
		foundModules = glob.sync(nameGlob, cwd: npmPath)
		foundModules = _.map foundModules, (foundModule) ->
			return path.join(npmPath, foundModule)

		result = result.concat(foundModules)

	return result

exports.load = (pluginGlob, pluginCallback, callback) ->
	try
		pluginsPaths = exports.getPluginsPathsByGlob(pluginGlob)
	catch error
		return callback(error)

	loadedPlugins = []

	for pluginPath in pluginsPaths
		try
			plugin = new Plugin(pluginPath)
			loadedPlugins.push(plugin)
			pluginCallback?(null, plugin)
		catch error
			pluginCallback?(error)

	return callback?(null, loadedPlugins)
