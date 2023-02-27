import chalk from 'chalk'
import dedent from 'dedent-js'

const printError = (error) => {
  console.log(chalk.bgRed(' ERROR ') + ' ' + error);
}

const printSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCES ') + ' ' + message);
}

const printHelp = () => {
  console.log(
    dedent(`${chalk.bgCyan(' HELP ')}
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
    `)
  );
}
const printWeather = (weather) => {
  console.log(dedent(`
    ${chalk.bgCyan('Погода в городе:' + weather.name)}
    Температура - ${weather.main.temp}C
    Облачность - ${weather.weather[0].icon} ${weather.weather[0].description}
    Скорость ветра - ${weather.wind.speed}`));
}

export { printError, printSuccess, printHelp, printWeather }