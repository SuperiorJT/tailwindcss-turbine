import plugin from 'tailwindcss/plugin';
import {DEFAULTS, ITurbineConfig} from './models/turbine-config';
import {prependApply, applyBaseStyles, applyModifierStyles, applyBaseColorStyles, applyModifierColorStyles} from './util';

/**
 * Utility function used to default the colorValidator to return true.
 *
 * @param {ITurbineConfig} config
 * @returns
 */
function getColorValidator(config: ITurbineConfig) {
	return config.colorValidator ?? ((_color: string, _values: any) => true);
}

/**
 * Mutates the provided Turbine config to prepend `@apply` in styles that need it.
 *
 * @param {ITurbineConfig} config
 */
function parseStyles(config: ITurbineConfig) {
	const {baseStyles, modifiers} = config;
	if (modifiers) {
		for (const key of Object.keys(modifiers)) {
			modifiers[key] = prependApply(modifiers[key]);
		}
	}

	if (baseStyles) {
		config.baseStyles = prependApply(baseStyles);
	}
}

/**
* Tailwind CSS plugin which will generate class-based components using
* a provided config object and your color theme.
*
* @defaultValue Not providing a configuration object will generate tail-kit-styled buttons
*
* @see [Docs](https://github.com/SuperiorJT/tailwindcss-turbine)
*
* @param config The configuration object to generate components from.
*/
const turbine = plugin.withOptions<ITurbineConfig>((config: ITurbineConfig = DEFAULTS) => {
	return ({addComponents, theme}) => {
		const colorValidator = getColorValidator(config);
		parseStyles(config);
		const styleMap = {};
		if (config.baseStyles) {
			applyBaseStyles(config, styleMap);
			applyModifierStyles(config, styleMap);
		}

		const colorMap = theme('colors');
		if (colorMap && typeof colorMap !== 'string') {
			for (const color of Object.keys(colorMap)) {
				if (colorValidator(color, colorMap[color])) {
					applyBaseColorStyles(config, color, styleMap);
					applyModifierColorStyles(config, color, styleMap);
				}
			}
		}

		addComponents(styleMap);
	};
});
export = turbine;
