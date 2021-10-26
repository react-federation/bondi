
import { act, renderHook } from '@testing-library/react-hooks'
import useNavegableForm, { FormItem } from '../useNavegableForm'
import remoteConfig from '../../forms/remotes.form'

describe("useNavegableForm", () => {
  test("useNavegableForm right", () => {
    const { result } = renderHook(() => useNavegableForm(remoteConfig as FormItem[]))

    const currentState = {
      name: 'app_title',
      label: 'Nombre de la aplicación que va ir en el title: ',
      type: 'text',
      index: 0
    }

    const [{ CurrentComponent, state }, next] = result.current
    expect(CurrentComponent).toBeDefined()
    expect(state).toEqual(currentState)
    expect(next).toBeInstanceOf(Function)
  })

  test("useNavegableForm wrong", () => {
    const { result } = renderHook(() => useNavegableForm([]))
    const [{ CurrentComponent }] = result.current
    expect(CurrentComponent).not.toBeDefined()
  })

  test("useNavegableForm next function", async () => {
    const { result } = renderHook(() => useNavegableForm(remoteConfig as FormItem[]))
    const [{ state }, next] = result.current
    const { index } = state

    act(() => {
      next()
    })

    setTimeout(() => {
      expect(index).toBe(1)
    }, 500);
  })
})