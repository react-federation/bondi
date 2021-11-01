const path = require('path')
const fs = require('fs-extra')
const envfile = require('envfile')

interface EnvVariables {
  APP_TITLE: string,
  APP_NAMESPACE: string,
  APP_MODULE: string
}

export default function createEnvFile(payload: EnvVariables, name: string) {
  try {
    const filePath = path.resolve(process.cwd(), name)
    const source = envfile.stringify(payload)
    fs.writeFile(filePath, source, (err: string) => {
      
      if (err) {
        return console.log(err);
      }

      console.log("Proyecto creado");
    });
  } catch (err) {
    console.log (err)
    process.exit(1)
  }
}
