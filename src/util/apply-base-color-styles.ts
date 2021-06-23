import {ITurbineConfig} from '../models/turbine-config';
import {prependApply} from './prepend-apply';

/**
 * Mutates the provided target object, adding the color styles from the config
 * and the base styles beforehand if present in the config.
 *
 * @param {ITurbineConfig} config
 * @param {string} color
 * @param {*} [target={}]
 */
export const applyBaseColorStyles = (config: ITurbineConfig, color: string, target: any = {}) => {
	const {prefix, baseStyles, colorStyles} = config;
	const styles = prependApply(colorStyles(color));
	if (baseStyles) {
		target[`.${prefix}-${color}`] = {
			[baseStyles]: {},
			[styles]: {}
		};
		return;
	}

	target[`.${prefix}-${color}`] = {
		[styles]: {}
	};
};
