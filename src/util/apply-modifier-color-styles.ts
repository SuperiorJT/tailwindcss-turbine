import { ITurbineConfig } from '../models/turbine-config';
import { prependApply } from './prepend-apply';

/**
 * Mutates the provided target object, adding styles for eacb modifier in the Turbine config
 * for the provided color.
 *
 * @param {ITurbineConfig} config
 * @param {string} color
 * @param {*} [target={}]
 */
export const applyModifierColorStyles = (config: ITurbineConfig, color: string, target: any = {}) => {
	const { prefix, baseStyles, modifiers, colorStyles } = config;
	if (modifiers) {
		for (const modifier of Object.keys(modifiers)) {
			target[`.${prefix}-${modifier}-${color}`] = {};
			if (baseStyles) {
				target[`.${prefix}-${modifier}-${color}`][baseStyles] = {};
			}

			target[`.${prefix}-${modifier}-${color}`][modifiers[modifier]] = {};
			target[`.${prefix}-${modifier}-${color}`][prependApply(colorStyles(color))] = {};
		}
	}
};

