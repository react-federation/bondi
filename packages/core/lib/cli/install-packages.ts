import which from 'which'

import executeCommand from './execute-command'

async function installPackages() {
  try {
    await which("yarn")
    await executeCommand("yarn", ["install"])
  } catch (error) {
    await executeCommand("npm", ["install"])
  } finally {
    await executeCommand("rm", ["-rf", ".git"])
    await executeCommand("git", ["init"])
    try {
      await which("code")
      await executeCommand("code", ["."])
    } catch (error) {

    }
  }
}

export default installPackages