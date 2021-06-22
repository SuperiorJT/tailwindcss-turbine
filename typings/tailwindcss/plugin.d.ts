import {Postcss} from 'postcss';

interface TailwindPluginProviders {
	addUtilities: (styles: any, options?: any) => void;
	addComponents: (styles: any, options?: any) => void;
	addBase: (styles: any) => void;
	addVariant: (name: string, generator: ({modifySelectors: (providers: {className?: string; selector?: string}) => string; separator: string}), options?: any) => void;
	e: (styles: string) => string;
	prefix: (selector: string) => string;
	theme: (path: string, defaultValue?: any) => Record<string, unknown> | string | undefined;
	variants: (path: string, defaultValue?: any) => Record<string, unknown> | string | undefined;
	config: (path: string, defaultValue?: any) => Record<string, unknown> | string | undefined;
	postcss: Postcss;
}

declare module 'tailwindcss/plugin' {
	declare function plugin(handler: (providers: TailwindPluginProviders) => void, config: any): {handler: (providers: TailwindPluginProviders) => void; config: any};
	declare namespace plugin {
		export function withOptions<T>(optionsFunction: (options: any) => (providers: TailwindPluginProviders) => void, configFunction?: (options: any) => any): (options: T) => {__options: any; handler: (providers: TailwindPluginProviders) => void; config: (options: any) => any};
	}
	export default plugin;
}
