const fs = require('node:fs')
const path = require('path')
const rootPackageJSON = require('../package.json')
const workspaces = rootPackageJSON.workspaces.map((w) => w.replace('/*', ''))

workspaces.map((workspace) => {
    const packages = fs
        .readdirSync(path.join(__dirname, '..', workspace), { withFileTypes: true })
        .filter((file) => file.isDirectory())
        .map((dir) => dir.name)
        .filter((dir) => !dir.startsWith('.'))

    for (const name of packages) {
        const packageJSON = path.join(__dirname, '..', workspace, name, 'package.json')
        if (!fs.existsSync(packageJSON)) continue
        const content = fs.readFileSync(packageJSON).toString()
        const newContent = content.replace(
            /\"version\": "([^"]|\\")*"/g,
            `"version": "${rootPackageJSON.version}"`
        )
        fs.writeFileSync(packageJSON, newContent)
    }
})

console.log(`Bumped versions to: ${rootPackageJSON.version}`)
