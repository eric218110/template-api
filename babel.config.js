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
          '@logger': './src/common/logger/index.ts'
        }
      }]
    ],
    ignore: [
      '**/*.spec.ts'
    ]
  }