import React from 'react'
import { render, waitFor } from '@testing-library/react'
import createDynamicComponent from '../create-dynamic-component'
import useDynamicScript from '../use-dynamic-script'
import loadModule from '../load-module'

jest.mock('../use-dynamic-script')
jest.mock('../load-module')

describe('createDynamicComponent', () => {
  test('should show the placeholder and the loaded component', async () => {
    // @ts-ignore
    useDynamicScript.mockImplementationOnce(() => ({ ready: false }))
    // @ts-ignore
    loadModule.mockImplementationOnce(
      () => () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({ default: () => <p>test</p> })
          }, 300)
        })
    )
    const Component = createDynamicComponent({ url: 'https://localhost/script.js', scope: 'module', module: 'module' })
    const { asFragment } = render(<Component />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render the loaded compoenent', async () => {
    // @ts-ignore
    useDynamicScript.mockImplementationOnce(() => ({ ready: true }))
    // @ts-ignore
    loadModule.mockImplementationOnce(
      () => () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({ default: () => <p>test</p> })
          }, 300)
        })
    )
    const Component = createDynamicComponent({ url: 'https://localhost/script.js', scope: 'module', module: 'module' })
    const { getByText } = render(<Component />)

    await waitFor(() => expect(getByText('test')).toBeInTheDocument())
  })
})
