import { ITurbineConfig } from "../models/turbineConfig";

export const calculateBaseStyles = (config: ITurbineConfig) => {
    const {prefix, baseStyles} = config;
    if (baseStyles) {
        return {
            [`.${prefix}`]: {
                [baseStyles]: {}
            }
        };
    }
    return {};
};