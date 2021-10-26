import { Box as InkBox, Text } from 'ink'
import React, { FC } from 'react'

interface GenericBox {
  text: string
  margin?: number
  padding?: number
  height?: number
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch'
  textColor?: string
  rest?: any
}

const Box: FC<GenericBox> = ({ text, margin, padding, height, alignItems, textColor, children, ...rest }) => {
  return (
    <InkBox margin={margin} padding={padding} height={height} alignItems={alignItems} {...rest}>
      <Text color={textColor} {...rest}>
        {text}
      </Text>
      {children}
    </InkBox>
  )
}

export default Box
