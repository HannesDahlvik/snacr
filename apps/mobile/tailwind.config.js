const config = require('@snacr/ui-utils/tailwind')
const nativewind = require('nativewind/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
    ...config,
    presets: [nativewind]
}
