import SelectInput from "ink-select-input";
import TextInput from "ink-text-input";
import { ComponentType, useState } from "react"
import type { Item } from "ink-select-input/build/SelectInput";

const mapComponent: Record<
  "text" | "select",
  typeof TextInput | typeof SelectInput
> = {
  text: TextInput,
  select: SelectInput,
};

export interface FormItem {
  name: string;
  type: "text" | "select";
  label: string;
  options?: Item<string>[];
  index?: number
  validator?: (value: string) => boolean
}

type UseNavegableResult = [
  { CurrentComponent: ComponentType<CurrentComponentProps>, state: FormItem },
  () => void
]

interface CurrentComponentProps {
  onChange: (value: any) => void,
  onSubmit: (value: any) => void,
  value: string,
  items?: any
}

function useNavegableForm(form: FormItem[]): UseNavegableResult {
  const [index, setState] = useState<number>(0)

  const currentItem = form[index];
  const CurrentComponent = mapComponent[currentItem?.type] as ComponentType<CurrentComponentProps>;

  const next = () => {
    setState(prev => prev + 1)
  }

  return [{ CurrentComponent, state: { ...form[index], index } }, next]
}

export default useNavegableForm
