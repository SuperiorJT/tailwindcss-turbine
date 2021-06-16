import { ITurbineConfig } from "../models/turbineConfig";
import { prependApply } from "./prependApply";

export const calculateModifierColorStyles = (config: ITurbineConfig, color: string) => {
    const {prefix, baseStyles, modifiers, colorStyles} = config;
    if (modifiers) {
        return Object.entries(modifiers).reduce((res, [modifier, styles]) => {
            return {
                ...res,
                [`.${prefix}-${modifier}-${color}`]: {
                    ...(baseStyles ? { [baseStyles]: {} } : {}),
                    [styles]: {},
                    [prependApply(colorStyles(color))]: {}
                }
            };
        }, {});
    }
    return {};
}