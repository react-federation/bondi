import React, { useState, VoidFunctionComponent } from 'react'
import { onCreateRemoteTemplate } from '@bondi-js/core'
import useNavegableForm, { FormItem } from '../hooks/useNavegableForm'
import { Box } from './common'

export interface FormBuilderProps {
  form: FormItem[]
}

const FormBuilder: VoidFunctionComponent<FormBuilderProps> = ({ form }) => {
  const [{ CurrentComponent, state }, next] = useNavegableForm(form)
  const [formState, setFormState] = useState({} as any)

  const handleSubmit = (value: string) => {
    if (state.type === 'select') {
      setFormState((prev: any) => ({ ...prev, [state.name]: value }))
    }
    if (state.index === form.length - 1) {
      onCreateRemoteTemplate(formState)
    } else {
      next()
    }
  }

  return (
    <Box height={5} textColor="green" text={state.label}>
      <CurrentComponent
        onChange={(value: any) => setFormState((prev: any) => ({ ...prev, [state.name]: value }))}
        value={formState[state.name] || ''}
        onSubmit={handleSubmit}
        {...{ items: state?.options }}
      />
    </Box>
  )
}

export default FormBuilder
