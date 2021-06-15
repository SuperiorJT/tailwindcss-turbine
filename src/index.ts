import plugin from 'tailwindcss/plugin';
import { DEFAULTS, ITurbineConfig } from './models/turbineConfig';
import { calculateBaseStyles, calculateModifierStyles, calculateBaseColorStyles, calculateModifierColorStyles } from './util';

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
        let all = {};
        if (config.baseStyles) {
            all = {
                ...all,
                ...calculateBaseStyles(config),
                ...calculateModifierStyles(config)
            }
        }

        const themed = Object.entries(theme('colors'))
            .filter(([color, values]) => config.colorValidator(color, values))
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