import * as React from "react";

import { FederatedModuleConfig } from "../types";

const useDynamicScript = ({ url }: Omit<FederatedModuleConfig, "module" | "scope">) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!url) {
      throw new TypeError(`config.url expected a string but got ${typeof url}`);
    }

    const element = document.createElement("script");

    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${url}`);
      setReady(false);
      setFailed(true);
      element.remove();
    };

    document.head.appendChild(element);

    // handle unmounting

    /*  return () => {
      console.log(`Dynamic Script Removed: ${url}`);
      document.head.removeChild(element);
    }; */
  }, [url]);

  return { ready, failed };
};

export default useDynamicScript;
