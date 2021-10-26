import { render } from 'ink-testing-library'
import create from '../create'

function setup() {
  return render(create as any)
}

describe('command create', () => {
  test('should match host snapshot', () => {
    expect(setup()).toMatchSnapshot()
  })
})
