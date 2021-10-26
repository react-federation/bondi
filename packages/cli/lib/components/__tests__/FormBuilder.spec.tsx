import React from 'react'
import { Text } from 'ink'
import { render } from 'ink-testing-library'
import FormBuilder from '../FormBuilder'
import useNavegableForm from '../../hooks/useNavegableForm'
import remoteConfig from '../../forms/remotes.form'

const state = {
  name: 'app_title',
  label: 'foo',
  type: 'select',
  index: 2
}

jest.mock('../../hooks/useNavegableForm')

describe('FormBuiler', () => {
  test('should return form builder component', () => {
    // @ts-ignore
    useNavegableForm.mockReturnValueOnce([
      { CurrentComponent: jest.fn().mockReturnValue(<Text>asdad</Text>), state },
      jest.fn()
    ])
    const { stdout } = render(<FormBuilder form={remoteConfig as any} />)
    console.log(stdout.lastFrame())
  })
})
