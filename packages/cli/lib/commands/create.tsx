import React from 'react'
import { render } from 'ink'
import FormBuilder from '../components/FormBuilder'
import remoteConfig from '../forms/remotes.form'

const host = (folderName: string) => {
  render(<FormBuilder form={remoteConfig as any} folderName={folderName} />)
}

export default host
