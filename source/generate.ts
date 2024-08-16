
import * as nodeFs from 'node:fs/promises'
import * as nodePath from 'node:path'

import stringify from 'json-stringify-pretty-compact'

type ColorValue = number

const defaultColorValue: ColorValue = 0

type Color = [
	ColorValue,
	ColorValue,
	ColorValue,
]

const rgbColor = (
	currentColorValueRs: ColorValue = defaultColorValue,
	currentColorValueGs: ColorValue = currentColorValueRs,
	currentColorValueBs: ColorValue = currentColorValueRs,
) => {

	const currentColor: Color = [
		currentColorValueRs,
		currentColorValueGs,
		currentColorValueBs,
	]

	return currentColor

}

type ColorIndex = number

const defaultColorIndex: ColorIndex = 0

const genericColorFrame = 0x33

const getColor = (
	currentColorIndexRs: ColorIndex = defaultColorIndex,
	currentColorIndexGs: ColorIndex = currentColorIndexRs,
	currentColorIndexBs: ColorIndex = currentColorIndexRs,
) => {

	const currentColorRs = genericColorFrame * currentColorIndexRs
	const currentColorGs = genericColorFrame * currentColorIndexGs
	const currentColorBs = genericColorFrame * currentColorIndexBs

	const currentColor = rgbColor(
		currentColorRs,
		currentColorGs,
		currentColorBs,
	)

	return currentColor

}

type Name = string

type Table<Type> = Record<string, Type>

const getThemeColors = (
	currentColorTheme: ColorTheme,
) => {

	const {
		frameActive,
		frameHidden,
		ntpBackground,
		ntpForeground,
		omniboxBackground,
		omniboxForeground,
		tabBackground,
		tabForeground,
		tabInactiveBackground,
		tabInactiveForeground,
		toolbarBackground,
		toolbarForeground,
		toolbarIcon,
	} = currentColorTheme

	const buttonBackground = rgbColor(255, 0, 0)

	const buttonHeader = rgbColor(-1)

	const buttonLink = rgbColor(-1)

	const nullColor = rgbColor(0)

	const currentThemeColors = {
		frame: frameActive,
		frame_inactive: frameHidden,
		frame_incognito: frameActive,
		frame_incognito_inactive: frameHidden,
		background_tab: tabBackground,
		background_tab_inactive: tabInactiveBackground,
		background_tab_incognito: tabBackground,
		background_tab_incognito_inactive: tabInactiveBackground,
		bookmark_text: toolbarForeground,
		button_background: buttonBackground,
		tab_background_text: tabForeground,
		tab_background_text_inactive: tabInactiveForeground,
		tab_background_text_incognito: tabForeground,
		tab_background_text_incognito_inactive: tabInactiveForeground,
		tab_text: toolbarForeground,
		toolbar: toolbarBackground,
		toolbar_button_icon: toolbarIcon,
		omnibox_text: omniboxForeground,
		omnibox_background: omniboxBackground,
		ntp_background: ntpBackground,
		ntp_header: buttonHeader,
		ntp_link: buttonLink,
		ntp_text: ntpForeground,
		'': nullColor,
	}

	return currentThemeColors

}

const getThemeTints = () => {

	const currentThemeTints = {
		buttons: rgbColor(-1),
		frame: rgbColor(0, 1, 0.5),
		frame_inactive: rgbColor(0, 1, 0.5),
		frame_incognito: rgbColor(0, 1, 0.5),
		frame_incognito_inactive: rgbColor(0, 1, 0.5),
		background_tab: rgbColor(0, 1, 0.5),
		'': rgbColor(0),
	}

	return currentThemeTints

}

const generateManifest = (
	currentColorTheme: ColorTheme,
	currentThemeName: Name,
) => {

	const name = ['grayscale', 'theme', currentThemeName].join(' ')

	const version = '1.0.0.1'

	const icons = {
		0x10: 'icons/10.png',
		0x30: 'icons/30.png',
		0x80: 'icons/80.png',
	}

	const colors = getThemeColors(
		currentColorTheme,
	)

	const tints = getThemeTints()

	const theme = {
		colors,
		tints,
		'': null,
	}

	return {
		manifest_version: 2,
		name,
		version,
		icons,
		theme,
		'': null,
	}

}

type Value = number

const currentIndexTheme = {

	toolbarBackground: 0x0,
	toolbarForeground: 0x1,

	omniboxBackground: 0x2,
	omniboxForeground: 0x3,

	tabBackground: 0x4,
	tabForeground: 0x5,

	tabInactiveBackground: 0x6,
	tabInactiveForeground: 0x7,

	frameActive: 0x8,
	frameHidden: 0x9,

	ntpBackground: 0xA,
	ntpForeground: 0xB,

	toolbarIcon: 0xC,

}

type IndexTheme = typeof currentIndexTheme

type ThemeProps = keyof IndexTheme

type ColorTheme = Record<ThemeProps, Color>

// # /0\/1\/2\/3\/4\/5\/6\/7\/8\/9\/A\/B\/C\
const currentValueArrayTable: Table<Array<Value>> = {
	a: [0, 2, 0, 4, 1, 3, 1, 3, 2, 1, 1, 3, 3],
	b: [1, 3, 1, 5, 2, 4, 0, 2, 2, 0, 1, 3, 4],
	c: [2, 4, 2, 5, 1, 3, 1, 3, 1, 0, 1, 3, 5],
	d: [3, 0, 3, 0, 2, 4, 1, 3, 2, 1, 1, 3, 0],
	e: [4, 1, 4, 0, 3, 0, 3, 0, 2, 1, 1, 3, 1],
	f: [5, 2, 5, 1, 3, 0, 3, 0, 2, 1, 1, 3, 2],
}

const getColorTheme = (
	currentValueArray: Array<Value>,
) => {

	const currentEntryArray = Object.entries(currentIndexTheme)

	const currentColorTable: Table<Color> = {}

	for (const currentEntry of currentEntryArray) {
		const [
			currentToken,
			currentIndex,
		] = currentEntry
		const currentValue = currentValueArray[currentIndex]
		if (currentValue == null) {
			continue
		}
		const currentColor = getColor(currentValue)
		currentColorTable[currentToken] = currentColor
	}

	const currentColorTheme = currentColorTable as Record<ThemeProps, Color>

	return currentColorTheme

}

const getText = (
	currentManifest: ReturnType<typeof generateManifest>,
) => {

	const indent = '\t'

	const jsonText = stringify(currentManifest, {
		indent,
	}) + '\n'

	return jsonText

}

const generateTheme = (
	currentThemeName: Name,
) => {

	const currentValueArray = currentValueArrayTable[currentThemeName]

	if (currentValueArray == null) {
		return
	}

	const currentColorTheme = getColorTheme(
		currentValueArray,
	)

	const currentManifest = generateManifest(
		currentColorTheme,
		currentThemeName,
	)

	const jsonManifestText = getText(
		currentManifest,
	)

	return jsonManifestText

}

type Text = string

const saveThemeManifest = async (
	themeManifestText: Text,
	themeName: Name,
) => {

	const basePath = ['theme', themeName].join('-')

	const fileName = 'manifest.json'

	const filePath = nodePath.join(basePath, fileName)

	await nodeFs.writeFile(filePath, themeManifestText)

}

const operateName = async (
	themeName: Name,
) => {

	const themeManifestText = generateTheme(
		themeName,
	)

	if (themeManifestText == null) {
		return
	}

	await saveThemeManifest(
		themeManifestText,
		themeName,
	)

}

const start = () => {

	const themeNameArray: Array<Name> = process.argv.slice(2)

	void themeNameArray.forEach(operateName)

}

if (require.main === module) {
	void start()
}
