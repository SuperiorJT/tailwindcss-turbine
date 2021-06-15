import isPlainObject from 'lodash.isplainobject';

export interface ITurbineConfig {
    prefix: NonNullable<string>;
    modifiers?: Record<string, string>;
    baseStyles?: string;
    colorStyles: (color: string) => string;
    colorValidator?: (color: string, values: any) => boolean;
}

export const DEFAULTS: ITurbineConfig = {
    prefix: 'btn',
    modifiers: {
        sm: '@apply text-sm py-1.5 px-3',
        lg: '@apply text-lg'
    },
    baseStyles: '@apply py-2 px-4 inline-flex justify-center items-center transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg',
    colorStyles: (color) => `@apply bg-${color}-600 hover:bg-${color}-700 focus:ring-${color}-500 focus:ring-offset-${color}-200 text-white`,
    colorValidator: (_, values) => isPlainObject(values) && values[600] && values[700] && values[500] && values[200]
}