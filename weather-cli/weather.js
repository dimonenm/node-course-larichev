#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getWeather, getWeather2 } from './services/api.service.js';
import { printHelp, printSuccess, printError } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const APIkey = '4c88f840994b5a941b3e99a4cda17356'

const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан токен')
    return
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    printSuccess('Токен сохранен')
  } catch (error) {
    printError(error.message)
  }
}

const initCLI = async () => {
  const args = getArgs(process.argv)
  console.log('process.env ', process.env);
  // console.log('process.env.NODE_ENV', process.env.NODE_ENV);

  if (args.h) {
    printHelp()
  }
  if (args.t) {
    return saveToken(args.t)
  }

  // getWeather('simferopol')
  // console.log(await getWeather2('simferopol'));

  // getWeather2('simferopol')
}

initCLI()