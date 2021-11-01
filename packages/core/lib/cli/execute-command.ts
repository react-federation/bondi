const spawn = require("cross-spawn")

export default function executeCommand(command: string, args: string[], options: Record<string, string> = {}) {
  const child = spawn(command, args, { stdio: "inherit", ...options })

  return new Promise((resolve, reject) => {
    child.on("close", (code: number) => {
      if (code) {
        reject(
          new Error(
            `${command} ${args.join(
              " "
            )} failed with exit code ${code}.`
          )
        )
        return
      }
      resolve(code)
    })
  })
}
