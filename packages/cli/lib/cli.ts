import { Command } from "commander";

import dev from "./commands/dev";
import packageJson from "../package.json";

const program = new Command();

program.version(packageJson.version).command("dev").option("-p, --port [number]").action(dev);

program.parse(process.argv);
