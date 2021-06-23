import isPlainObject from 'lodash.isplainobject';
/**
 * Turbine Configuration object which is passed into the plugin function to generate styles
 *
 * @interface ITurbineConfig
 */
export interface ITurbineConfig {

	/**
	 * The prefix for the generated styles. All generated styles will
	 * begin with `.{prefix}`
	 *
	 * @type {NonNullable<string>}
	 * @memberof ITurbineConfig
	 */
	prefix: NonNullable<string>;

	/**
	 * Object map of modifier styles to apply for each color in the theme.
	 * Styles are generated in the format: `.{prefix}-{modifier}-{color}`
	 *
	 * @type {Record<string, string>}
	 * @memberof ITurbineConfig
	 */
	modifiers?: Record<string, string>;

	/**
	 * Tailwind CSS styles to be used as the base styles for the generated
	 * component classes.
	 *
	 * @type {string}
	 * @memberof ITurbineConfig
	 */
	baseStyles?: string;

	/**
	 * Function which should return Tailwind CSS styles that utilize the provided
	 * color.
	 *
	 * @memberof ITurbineConfig
	 */
	colorStyles: (color: string) => string;

	/**
	 * Function used to prevent generation of component classes for unwanted/incompatible
	 * colors.
	 *
	 * @memberof ITurbineConfig
	 */
	colorValidator?: (color: string, values: any) => boolean;
}

export const DEFAULTS: ITurbineConfig = {
	prefix: 'btn',
	modifiers: {
		sm: 'text-sm py-1.5 px-3',
		lg: 'text-lg'
	},
	baseStyles: 'py-2 px-4 inline-flex justify-center items-center transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg',
	colorStyles: color => `bg-${color}-600 hover:bg-${color}-700 focus:ring-${color}-500 focus:ring-offset-${color}-200 text-white`,
	colorValidator: (_, values) => isPlainObject(values) && Boolean(values[600]) && Boolean(values[700]) && Boolean(values[500]) && Boolean(values[200])
};
