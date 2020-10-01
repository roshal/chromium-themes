
const fs = require('fs')
const json_stringify_pretty_compact = require('json-stringify-pretty-compact')

const treble = (r = 0, g = r, b = g) => {
	return [r, g, b]
}

const map = (value) => {
	return treble(51 * value)
}

const generate = (key, options) => ({
	"manifest_version": 2,
	"name": ['theme', key].join('-'),
	"version": "1",
	"theme": {
		"colors": {
			"frame": map(options.frame_onactive),
			"frame_inactive": map(options.frame_inactive),
			"frame_incognito": map(options.frame_incognito_onactive),
			"frame_incognito_inactive": map(options.frame_incognito_inactive),
			"background_tab": map(options.tabs_onactive_background),
			"background_tab_inactive": map(options.tabs_inactive_background),
			"background_tab_incognito": map(options.tabs_incognito_onactive_background),
			"background_tab_incognito_inactive": map(options.tabs_incognito_inactive_background),
			"bookmark_text": map(options.toolbar_foreground),
			"button_background": treble(255, 0),
			"tab_background_text": map(options.tabs_onactive_foreground),
			"tab_background_text_inactive": map(options.tabs_inactive_foreground),
			"tab_background_text_incognito": map(options.tabs_incognito_onactive_foreground),
			"tab_background_text_incognito_inactive": map(options.tabs_incognito_inactive_foreground),
			"tab_text": map(options.toolbar_foreground),
			"toolbar": map(options.toolbar_background),
			"toolbar_button_icon": map(options.toolbar_icon),
			"omnibox_text": map(options.omnibox_foreground),
			"omnibox_background": map(options.omnibox_background),
			"ntp_background": map(options.ntp_background),
			"ntp_header": treble(-1),
			"ntp_link": treble(-1),
			"ntp_text": map(options.ntp_foreground),
			"": treble(0),
		},
		"tints": {
			"buttons": treble(-1),
			"frame": [0, 1, 0.5],
			"frame_inactive": [0, 1, 0.5],
			"frame_incognito": [0, 1, 0.5],
			"frame_incognito_inactive": [0, 1, 0.5],
			"background_tab": [0, 1, 0.5],
			"": treble(0),
		},
		"": null,
	},
	"": null,
})
//    +  +  +  +  ?  ?  ?  ?  ?  ?  ?  ?  ?  ?  ?  ?  ?  ?  ?
// # 00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18
const table = {
	a: [0, 4, 0, 2, 1, 3, 1, 3, 1, 3, 1, 3, 2, 1, 2, 1, 1, 3, 3],
	b: [1, 5, 1, 3, 2, 4, 2, 4, 2, 4, 2, 4, 2, 1, 2, 1, 1, 3, 4],
	c: [2, 5, 2, 4, 1, 3, 2, 4, 1, 3, 2, 4, 2, 1, 2, 1, 1, 3, 5],
	d: [3, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 1, 1, 3, 0],
	e: [4, 0, 4, 1, 3, 1, 3, 1, 3, 1, 3, 1, 2, 1, 2, 1, 1, 3, 1],
	f: [5, 1, 5, 2, 3, 1, 3, 1, 4, 2, 4, 2, 2, 1, 2, 1, 1, 3, 2],
}

const keys = []

keys[00] = 'omnibox_background'
keys[01] = 'omnibox_foreground'

keys[02] = 'toolbar_background'
keys[03] = 'toolbar_foreground'

keys[04] = 'tabs_onactive_background'
keys[05] = 'tabs_onactive_foreground'

keys[06] = 'tabs_inactive_background'
keys[07] = 'tabs_inactive_foreground'

keys[08] = 'tabs_incognito_onactive_background'
keys[09] = 'tabs_incognito_onactive_foreground'

keys[10] = 'tabs_incognito_inactive_background'
keys[11] = 'tabs_incognito_inactive_foreground'

keys[12] = 'frame_onactive'
keys[13] = 'frame_inactive'

keys[14] = 'frame_incognito_onactive'
keys[15] = 'frame_incognito_inactive'

keys[16] = 'ntp_background'
keys[17] = 'ntp_foreground'

keys[18] = 'toolbar_icon'

const zip = (keys, values) => {
	const limit = Math.min(keys.length, values.length)
	const range = Array(limit).keys()
	const table = {}
	for (const index of range) {
		const key = keys[index]
		table[key] = values[index]
	}
	return table
}

const handle = (key) => {
	const values = table[key]
	if (values == null) {
		return
	}
	const options = zip(keys, values)
	const manifest = generate(key, options)
	const path = `theme-color-${key}/manifest.json`
	const json = json_stringify_pretty_compact(manifest, {
		indent: '\t',
	}) + '\n'
	fs.writeFileSync(path, json)
}

if (require.main === module) {
	process.argv.slice(2).forEach(handle)
}
