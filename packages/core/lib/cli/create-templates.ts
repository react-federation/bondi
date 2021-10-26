/* eslint-disable camelcase */

import executeCommand from "./execute-command"
import createEnvFile from "./create-env-files"

async function createTemplate(url: string, app: Record<string, string>) {
  const { app_title, app_namespace, app_module } = app
  try {
    const command = "git"
    const args = ["clone", url, app_title]
    await executeCommand(command, args)
    process.chdir(app_title)
    createEnvFile({ APP_TITLE: app_title, APP_NAMESPACE: app_namespace, APP_MODULE: app_module }, '.env')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export async function onCreateRemoteTemplate({ app_title = "app-name", app_namespace = "app-namespace", app_module = "app-module" }) {
  try {
    const url =
      "git@gitlab.com:arquitectura-prisma/arquitectura/poc/microfront-monorepo.git"
    await createTemplate(url, { app_title, app_namespace, app_module })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export async function onCreateHostTemplate({ app_title = "app-name", app_namespace = "app-namespace", app_module = "app-module" }) {
  try {
    const url =
      "git@gitlab.com:arquitectura-prisma/arquitectura/poc/microfront-monorepo.git"
    await createTemplate(url, { app_title, app_namespace, app_module })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
