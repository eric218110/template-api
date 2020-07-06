module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      ['module-resolver', {
        alias: {
          '@controllers': './src/source/controllers/',
          '@services': './src/source/services/',
          '@entitys': './src/database/entitys/',
          '@logger': './src/common/logger/index.js'
        }
      }],
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }]
    ],
    ignore: [
      '**/*.spec.ts'
    ]
  }