# tailwindcss-turbine ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/SuperiorJT/tailwindcss-turbine/CI?color=%2306B6D4) ![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/Superiorjt/tailwindcss-turbine?color=%2306B6D4&sort=semver) ![NPM](https://img.shields.io/npm/l/tailwindcss-turbine?color=06b6d4)

> **Note** - This plugin currently only officially supports **Tailwind CSS v2.1** and upwards

`tailwindcss-turbine` is a plugin that was built to easily generate different component classes for your application. The goal of this project is to be able to easily use custom Tailwind CSS elements within your own app.

For example, the default options for Turbine will generate `.btn` classes based on the buttons designed in [tail-kit](https://www.tailwind-kit.com/components/buttons). It's easy to make reusable components by simply copying the Tailwind CSS styles into the Turbine config and using the generated classes.

### Installation

```bash
npm i -D tailwindcss-turbine
```

## Usage

In your `tailwind.config.js`:

```javascript
const turbine = require('tailwindcss-turbine');

module.exports = {
  ...
  plugins: [
    turbine, // Defaults to tail-kit buttons
    
    // Full example
    turbine({
      prefix: 'my-prefix',
      baseStyles: 'px-4 py-2 ...',
      modifiers: {
        sm: 'px-3 py-0.5 ...',
        lg: 'px-5 py-3 ...',
      },
      colorStyles: (color) => `bg-${color}-500 text-white`,
      colorValidator: (color, values) => color !== 'gray' && values[500]
    })
  ]
}
```

### How It Works

For each color in your theme, Turbine will generate a class name resembling `.{prefix}-{color}` and have the provided styles for each color. Styles are applied in separate steps following a specific hierarchy:

`baseStyles` < `modifiers` < `colorStyles`

By styles being organized in this way, you are easily able to override styles when needed without any conflicts (hopefully).

Modifiers will insert their prefix in between the `prefix` and the `color` to resemble `.{prefix}-{modifier}-{color}`.

For the example above, the class name for a small blue component would be `.my-prefix-sm-blue`. For this, Turbine will generate:
```css
.my-prefix-sm-blue {
  @apply px-4 py-2 ...
  @apply px-3 py-0.5 ...
  @apply bg-blue-500 text-white
}
```

And after Tailwind CSS handles overrides, you end up with:

```css
.my-prefix-sm-blue {
  @apply px-3 py-0.5 ... bg-blue-500 text-white
}
```

## Turbine Config

|        Name       |               Type               |                                           Description                                          |                        Example                       |
| ----------------- | -------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `prefix`          | `string`                         | Class prefix used to identify your components                                                  | `'btn'`                                              |
| `baseStyles?`     | `string`                         | Base Tailwind CSS styles for the component                                                     | `'@apply px-4 py-2'`                                 |
| `modifiers?`      | `{ [modifier: string]: string }` | Object where each key is a modifier prefix and values are Tailwind CSS overrides               | `{ sm: '@apply px3 py-0.5' }`                        |
| `colorStyles`     | `(color) => string`              | Function which returns Tailwind CSS styles that utilize theme colors                           | `` (color) => `@apply bg-${color}-500 text-white` `` |
| `colorValidator?` | `(color, values) => boolean`     | Function which is used to only generate components for theme colors that meet the requirements | `(color, values) => color !== 'gray'`                |

## Troubleshooting

> *Tailwind CSS is throwing a class not found error for one of my colors.*

This has to do with one of the colors in your theme not having a value for the color class you are requesting. There are two solutions for this:
  1. Add a color value to your theme config that matches the class name used in your `colorStyles`
  2. Modify/Add the `colorValidator` to prevent the target color/value from having Turbine-generated styles
