import { ITurbineConfig } from "../models/turbineConfig";

export const calculateModifierStyles = (config: ITurbineConfig) => {
    const {prefix, baseStyles, modifiers} = config;
    if (modifiers) {
        return Object.entries(modifiers).reduce((res, [modifier, styles]) => {
            return {
                ...res,
                [`.${prefix}-${modifier}`]: {
                    ...(baseStyles ? { [baseStyles]: {} } : {}),
                    [styles]: {}
                }
            };
        }, {});
    }
    return {};
}