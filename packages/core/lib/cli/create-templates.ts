/* eslint-disable camelcase */
import executeCommand from "./execute-command"
import createEnvFile from "./create-env-files"
import installPackages from "./install-packages"

async function createTemplate(url: string, app: Record<string, string>) {
  const { app_title, app_namespace, app_module, folderName } = app
  try {
    const command = "git"
    const args = ["clone", url]

    if (folderName) {
      args.push(folderName)
    }

    await executeCommand(command, args)
    process.chdir(folderName)
    createEnvFile({ APP_TITLE: app_title, APP_NAMESPACE: app_namespace, APP_MODULE: app_module }, '.env')
    await installPackages()
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export async function onCreateTemplate({ app_title = "app-name", app_namespace = "app-namespace", app_module = "app-module", folderName = "" },) {
  try {
    const url = "https://github.com/react-federation/template.git"
    await createTemplate(url, { app_title, app_namespace, app_module, folderName })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
