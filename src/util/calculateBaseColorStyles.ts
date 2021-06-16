import { ITurbineConfig } from "../models/turbineConfig";
import { prependApply } from "./prependApply";

export const calculateBaseColorStyles = (config: ITurbineConfig, color: string) => {
    const {prefix, baseStyles, colorStyles} = config;
    const styles = prependApply(colorStyles(color));
    if (baseStyles) {
        return {
            [`.${prefix}-${color}`]: {
                [baseStyles]: {},
                [styles]: {}
            }
        };
    }
    return {
        [`.${prefix}-${color}`]: {
            [styles]: {}
        }
    };
};