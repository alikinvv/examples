const path = require('path')

module.exports = {
    webpack: {
        alias: {
            react: path.resolve('./node_modules/react'),
            'styled-components': path.resolve(
                './node_modules/styled-components',
            ),
            'styled-components/macro': path.resolve(
                './node_modules/styled-components/macro',
            ),
            'react-router-dom': path.resolve(
                './node_modules/react-router-dom/',
            ),
            'react-hook-form': path.resolve('./node_modules/react-hook-form/'),
            'react-datepicker': path.resolve(
                './node_modules/react-datepicker/',
            ),
            'react-dropzone': path.resolve('./node_modules/react-dropzone/'),
            'react-select': path.resolve('./node_modules/react-select/'),
            'react-modal': path.resolve('./node_modules/react-modal/'),
        },
        configure: (webpackConfig) => {
            const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
                ({ constructor }) =>
                    constructor && constructor.name === 'ModuleScopePlugin',
            )

            webpackConfig.resolve.plugins.splice(scopePluginIndex, 1)
            return webpackConfig
        },
    },
}
