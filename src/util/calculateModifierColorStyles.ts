import { ITurbineConfig } from "../models/turbineConfig";

export const calculateModifierColorStyles = (config: ITurbineConfig, color: string) => {
    const {prefix, baseStyles, modifiers, colorStyles} = config;
    if (modifiers) {
        return Object.entries(modifiers).reduce((res, [modifier, styles]) => {
            return {
                ...res,
                [`.${prefix}-${modifier}-${color}`]: {
                    ...(baseStyles ? { [baseStyles]: {} } : {}),
                    [styles]: {},
                    [colorStyles(color)]: {}
                }
            };
        }, {});
    }
    return {};
}