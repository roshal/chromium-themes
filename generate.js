
const fs = require('fs')
const json_stringify_pretty_compact = require('json-stringify-pretty-compact')

const treble = (r = 0, g = r, b = g) => {
	return [r, g, b]
}

const map = (value) => {
	return treble(51 * value)
}

const generate = (key, options) => ({
	manifest_version: 2,
	name: ['theme', key].join(' '),
	version: '1',
	theme: {
		colors: {
			frame: map(options.frame_active),
			frame_inactive: map(options.frame_hidden),
			frame_incognito: map(options.frame_active),
			frame_incognito_inactive: map(options.frame_hidden),
			background_tab: map(options.tabs_background),
			background_tab_inactive: map(options.tabs_inactive_background),
			background_tab_incognito: map(options.tabs_background),
			background_tab_incognito_inactive: map(options.tabs_inactive_background),
			bookmark_text: map(options.toolbar_foreground),
			button_background: treble(255, 0),
			tab_background_text: map(options.tabs_foreground),
			tab_background_text_inactive: map(options.tabs_inactive_foreground),
			tab_background_text_incognito: map(options.tabs_foreground),
			tab_background_text_incognito_inactive: map(options.tabs_inactive_foreground),
			tab_text: map(options.toolbar_foreground),
			toolbar: map(options.toolbar_background),
			toolbar_button_icon: map(options.toolbar_icon),
			omnibox_text: map(options.omnibox_foreground),
			omnibox_background: map(options.omnibox_background),
			ntp_background: map(options.ntp_background),
			ntp_header: treble(-1),
			ntp_link: treble(-1),
			ntp_text: map(options.ntp_foreground),
			'': treble(0),
		},
		tints: {
			buttons: treble(-1),
			frame: treble(0, 1, 0.5),
			frame_inactive: treble(0, 1, 0.5),
			frame_incognito: treble(0, 1, 0.5),
			frame_incognito_inactive: treble(0, 1, 0.5),
			background_tab: treble(0, 1, 0.5),
			'': treble(0),
		},
		'': null,
	},
	'': null,
})

const keys = []

keys[00] = 'toolbar_background'
keys[01] = 'toolbar_foreground'

keys[02] = 'omnibox_background'
keys[03] = 'omnibox_foreground'

keys[04] = 'tabs_background'
keys[05] = 'tabs_foreground'

keys[06] = 'tabs_inactive_background'
keys[07] = 'tabs_inactive_foreground'

keys[08] = 'frame_active'
keys[09] = 'frame_hidden'

keys[10] = 'ntp_background'
keys[11] = 'ntp_foreground'

keys[12] = 'toolbar_icon'

// # 00 01 02 03 04 05 06 07 08 09 10 11 12
const table = {
	a: [0, 2, 0, 4, 1, 3, 1, 3, 2, 1, 1, 3, 3],
	b: [1, 3, 1, 5, 2, 4, 0, 2, 2, 0, 1, 3, 4],
	c: [2, 4, 2, 5, 1, 3, 1, 3, 1, 0, 1, 3, 5],
	d: [3, 0, 3, 0, 2, 4, 1, 3, 2, 1, 1, 3, 0],
	e: [4, 1, 4, 0, 3, 0, 3, 0, 2, 1, 1, 3, 1],
	f: [5, 2, 5, 1, 3, 0, 3, 0, 2, 1, 1, 3, 2],
}

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
