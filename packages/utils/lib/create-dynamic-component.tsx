import React, { ComponentType } from 'react'

import { FederatedModuleConfig } from '../types'
import loadModule from './load-module'
import useDynamicScript from './use-dynamic-script'

const createDynamicComponent = function <T = any>({
  url,
  scope,
  module,
  placeholder = <p>Loading...</p>
}: FederatedModuleConfig & { placeholder?: JSX.Element }): ComponentType<T> {
  function DynamicComponent(props: T = {} as any) {
    const { ready, failed } = useDynamicScript({
      url
    })

    if (!ready) {
      return placeholder
    }

    if (failed) {
      throw new Error(`Failed to load script ${url}`)
    }

    const esModule = loadModule<{ default: ComponentType }>({ scope, module })

    const Component = React.lazy(esModule)

    return (
      <React.Suspense fallback="Loading System">
        <Component {...props} />
      </React.Suspense>
    )
  }

  return DynamicComponent
}

export default createDynamicComponent
