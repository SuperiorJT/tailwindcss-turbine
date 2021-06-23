import { ITurbineConfig } from '../models/turbine-config';

/**
 * Mutates the provided target, adding base styles for each modifier in the Turbine config.
 *
 * @param {ITurbineConfig} config
 * @param {*} [target={}]
 */
export const applyModifierStyles = (config: ITurbineConfig, target: any = {}) => {
	const { prefix, baseStyles, modifiers } = config;
	if (modifiers) {
		for (const modifier of Object.keys(modifiers)) {
			target[`.${prefix}-${modifier}`] = {};
			if (baseStyles) {
				target[`.${prefix}-${modifier}`][baseStyles] = {};
			}

			target[`.${prefix}-${modifier}`][modifiers[modifier]] = {};
		}
	}
};
