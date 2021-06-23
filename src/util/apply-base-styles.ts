import {ITurbineConfig} from '../models/turbine-config';

/**
 * Mutates the provided target object to add base styles from the Turbine config.
 *
 * @param {ITurbineConfig} config
 * @param {*} [target={}]
 */
export const applyBaseStyles = (config: ITurbineConfig, target: any = {}) => {
	const {prefix, baseStyles} = config;
	if (baseStyles) {
		target[`.${prefix}`] = {
			[baseStyles]: {}
		};
	}
};
