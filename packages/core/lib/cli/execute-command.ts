const spawn = require("cross-spawn")

export default function executeCommand(command: string, args: string[], options: Record<string, string> = {}) {
  const child = spawn(command, args, { ...options })

  return new Promise((resolve, reject) => {
    child.stdout.on("data", (data: string) => {
      console.log(`stdout: ${data}`)
    })

    child.stderr.on("error", (error: string) => {
      console.error(`stderr: ${error}`)
      reject(          
        new Error(
          `${command} ${args.join(
            " "
          )} Error: ${error}.`
        ))
    })

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
