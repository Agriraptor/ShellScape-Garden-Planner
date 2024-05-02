const { defaults } = require('jest-config');
/** @type {import('jest').Config} */
const config = {
  verbose: true,
  //mongodb preset
  preset: '@shelf/jest-mongodb',
  //analogs of webpack modules/extneions to help jest find files to mock
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'bower_components', 'shared'],

  moduleNameMapper: {
    '\\.(css|less)$': 'ShellScape-Garden-Planner/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg)$': 'ShellScape-Garden-Planner/__mocks__/fileMock.js',
    //handling webpack alias
    '^react(.*)$': 'ShellScape-Garden-Planner/node_modules/react$1',
    '^config$': 'ShellScape-Garden-Planner/configs/app-config.js',
  },
  //mock out asset and style sheets
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'ShellScape-Garden-Planner/__mocks__/fileMock.js',
    '\\.(css|less)$': 'ShellScape-Garden-Planner/__mocks__/styleMock.js',
  },
};

module.exports = config;
