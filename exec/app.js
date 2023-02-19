const { exec } = require('child_process')

const childProcess = exec('dir', (err, stdout, stderr) => {
  if (err) {
    console.error(err.message)
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
})

childProcess.on('close', (code) => {
  console.log(`Exit code ${code}`);
})