import React, { useEffect, useState } from 'react'
import { Box, Text } from 'ink'
import Spinner from 'ink-spinner'
import Select from 'ink-select-input'

import detectPort from 'detect-port'

const options = [
  {
    label: 'Yes',
    value: true
  },
  {
    label: 'No',
    value: false
  }
]

export interface DevProps {
  port?: number
}

const SelectPort = ({ port = 3000 }) => {
  const [checkingPort, setCheckingPort] = useState(true)
  const [validPort, setValidPort] = useState(port)
  const [userAccepted, setUserAccepted] = useState(false)

  const isPortInUse = port !== validPort

  const onSelect = ({ value }: { value: boolean }) => {
    if (value) {
      setUserAccepted(true)
    } else {
      process.exit(0)
    }
  }

  useEffect(() => {
    detectPort(port).then((port) => {
      setCheckingPort(false)
      setValidPort(port)
    })
  }, [])

  if (checkingPort) {
    return (
      <Text>
        <Spinner type="dots" /> Checking if port {port} is available
      </Text>
    )
  }

  if (isPortInUse && !userAccepted) {
    return (
      <Box flexDirection="column">
        <Box width="100%">
          <Text>
            Port <Text underline>{port}</Text> is already in use, wanna try to use the port{' '}
            <Text underline>{validPort}</Text> instead?
          </Text>
        </Box>
        <Box width="100%">
          <Select onSelect={onSelect} items={options} />
        </Box>
      </Box>
    )
  }

  return <Text>✅ App started in port {validPort}</Text>
}

export default SelectPort
