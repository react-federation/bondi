import React from "react";
import { render } from "ink";

import SelectPort from "../components/Dev";

function dev({ port }: { port?: string }) {
  const parsedPort = port ? parseInt(port, 10) : undefined;
  
  render(<SelectPort port={parsedPort} />);
}

export default dev;
