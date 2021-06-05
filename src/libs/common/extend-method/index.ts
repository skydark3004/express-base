/**
 * @method registerExtensionMethods
 * @description load extension method
 */

import * as chalk from 'chalk';

export function registerExtensionMethods(options: { pagination: boolean, response: boolean }) {
  if (options.pagination) {
    const extName = require('./pagination.ext');
    console.info(chalk.blue(`Extension methods of "${extName.default}" has been applied!`));
  }
  if (options.response) {
    const extName = require('./response.ext');
    console.info(chalk.blue(`Extension methods of "${extName.default}" has been applied!`));
  }
}
