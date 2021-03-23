import chalk from 'chalk';

export const Log = (data: string) => {
  console.log(`[${chalk.green('LOG')}]: ${data}`);
}

export const Warn = (data: string) => {
  console.log(`[${chalk.yellow('WARN')}]: ${data}`)
}

export const Error = (data: string) => {
  console.log(`[${chalk.red('ERROR')}]: ${data}`)
}