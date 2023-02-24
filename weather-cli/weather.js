#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { printHelp, printSuccess, printError } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';

const APIkey = '4c88f840994b5a941b3e99a4cda17356'

const saveToken = async (token) => {
  try {
    await saveKeyValue('token', token)
    printSuccess('Токен сохранен')
  } catch (error) {
    printError(error.message)
  }
}

const initCLI = () => {
  const args = getArgs(process.argv)

  if (args.h) {
    printHelp()
  }
  if (args.t) {
    return saveToken(args.t)
  }
}

initCLI()