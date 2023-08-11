module.exports = {
    root: true,
    extends: ['custom'],
    settings: {
        next: {
            rootDir: ['apps/*/']
        }
    },
    rules: {
        'react-hooks/exhaustive-deps': 'off'
    }
}
