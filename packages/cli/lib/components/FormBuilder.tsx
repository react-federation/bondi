import React, { useState, VoidFunctionComponent } from 'react'
import { onCreateTemplate } from '@bondi-js/core'
import useNavegableForm, { FormItem } from '../hooks/useNavegableForm'
import { Box } from './common'

export interface FormBuilderProps {
  form: FormItem[]
  folderName?: string
}

const FormBuilder: VoidFunctionComponent<FormBuilderProps> = ({ form, folderName }) => {
  const [{ CurrentComponent, state }, next] = useNavegableForm(form)
  const [formState, setFormState] = useState({ folderName } as any)

  const handleSubmit = (value: string) => {
    if (state.type === 'select') {
      setFormState((prev: any) => ({ ...prev, [state.name]: value }))
    }

    if (state.index === form.length - 1) {
      onCreateTemplate(formState)
    } else {
      if (state.validator) {
        const isValid = state.validator(value)

        if (isValid) {
          next()
        }
      } else {
        next()
      }
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
