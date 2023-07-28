module.exports = {
    arrowParens: 'always',
    bracketSameLine: false,
    bracketSpacing: true,
    jsxSingleQuote: false,
    printWidth: 100,
    semi: false,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'none',
    importOrder: [
        '^(react/(.*)$)|^(react$)',
        '^(next/(.*)$)|^(next$)',
        '^(react-native/(.*)$)|^(react-native$)',
        '^(expo/(.*)$)|^(expo$)',
        '<THIRD_PARTY_MODULES>',
        '^@snacr/(.*)$',
        '',
        '^[./]'
    ],
    importOrderSeparation: true,
    plugins: ['@trivago/prettier-plugin-sort-imports']
}
