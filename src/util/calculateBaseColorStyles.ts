import { ITurbineConfig } from "../models/turbineConfig";

export const calculateBaseColorStyles = (config: ITurbineConfig, color: string) => {
    const {prefix, baseStyles, colorStyles} = config;
    if (baseStyles) {
        return {
            [`.${prefix}-${color}`]: {
                [baseStyles]: {},
                [colorStyles(color)]: {}
            }
        };
    }
    return {};
};