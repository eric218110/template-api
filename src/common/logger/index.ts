import chalk from 'chalk';

export class Logger {
  static error (error: {message: string, title?: string}) {
    const { log } = console;
    log(chalk.redBright(`${error.title !== undefined ? error.title.toUpperCase() : ''} - ${error.message}`));
  }

  static warning (warning: {message: string, title?: string}) {
    const { log } = console;
    log(chalk.yellow(`${warning.title !== undefined ? warning.title.toUpperCase() : ''} - ${warning.message}`));
  }

  static success (success: {message: string, title?: string}) {
    const { log } = console;
    log(chalk.green(`${success.title !== undefined ? success.title.toUpperCase() : ''} - ${success.message}`));
  }
}
