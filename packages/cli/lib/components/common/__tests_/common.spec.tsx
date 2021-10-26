import { render } from 'ink-testing-library'
import React from 'react'
import Box from '../Box'

describe('Box component', () => {
  test('should match box snapshot', () => {
    const { stdout } = render(<Box text="Hello World" />)
    expect(stdout.lastFrame()).toBe('Hello World')
  })
})
