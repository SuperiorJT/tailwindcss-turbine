import plugin from 'tailwindcss/plugin';
import { DEFAULTS, ITurbineConfig } from './models/turbineConfig';
import { calculateBaseStyles, calculateModifierStyles, calculateBaseColorStyles, calculateModifierColorStyles, prependApply } from './util';

function getColorValidator(config: ITurbineConfig) {
    return config.colorValidator ?? ((_color: string, _values: any) => true);
}

function parseStyles(config: ITurbineConfig): ITurbineConfig {
    return {
        ...config,
        baseStyles: config.baseStyles && prependApply(config.baseStyles),
        modifiers: config.modifiers && Object.entries(config.modifiers).reduce((res, [key, val]) => {
            return {
                ...res,
                [key]: prependApply(val)
            };
        }, {})
    };
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
        config = parseStyles(config);
        let all = {};
        if (config.baseStyles) {
            all = {
                ...all,
                ...calculateBaseStyles(config),
                ...calculateModifierStyles(config)
            }
        }

        const themed = Object.entries(theme('colors'))
            .filter(([color, values]) => colorValidator(color, values))
            .reduce((res, [color, _]) => {
            return {
                ...res,
                ...calculateBaseColorStyles(config, color),
                ...calculateModifierColorStyles(config, color)
            };
        }, {});

        all = {
            ...all,
            ...themed
        };

        addComponents(all);
    };
});
export = turbine;
