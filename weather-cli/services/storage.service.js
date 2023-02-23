import { homedir } from 'os'
import { join, dirname } from 'path'
import { promises } from 'fs'
import chalk from 'chalk'

const filePath = join(homedir(), 'weather-cli', 'weather-data.json')

const saveKeyValue = async (key, value) => {
  let data = {}

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath)
    data = JSON.parse(file)
  }
  data[key] = value
  await promises.writeFile(filePath, JSON.stringify(data))
}

const getKeyValue = async(key) => {
  if(await isExist(filePath)) {
    const file = await promises.readFile(filePath)
    const data = JSON.parse(file)
    return data[key]
  }
  return undefined
}

const isExist = async (path) => {
  try {
    await promises.stat(path)
    return true
  } catch (error) {
    return false
  }
}

export { saveKeyValue, getKeyValue }