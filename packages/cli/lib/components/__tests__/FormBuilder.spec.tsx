import React from 'react'
import { render } from 'ink-testing-library'
import FormBuilder from '../FormBuilder'
import remoteConfig from '../../forms/remotes.form'

jest.mock('../../hooks/useNavegableForm', () => ({
  useNavegableForm: () => {
    const state = {
      name: 'app_title',
      label: 'foo',
      type: 'select',
      index: 2
    }
    return [{ CurrentComponent: jest.fn(), state }, jest.fn()]
  }
}))

describe('FormBuiler', () => {
  test('should return form builder component', () => {
    const { stdout } = render(<FormBuilder form={remoteConfig as any} />)
    console.log(stdout.lastFrame())
  })
})
