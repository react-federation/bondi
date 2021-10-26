import { Command } from "commander";
import packageJson from "../package.json";

import createProject from "./commands/create";

const program = new Command();

const create = program.version(packageJson.version).command("create")

create
  .command("create <name>")
  .description("starts a frontend project with the given name")
  // .option("-p, --port [number]")
  .action(createProject);

program.parse(process.argv);
