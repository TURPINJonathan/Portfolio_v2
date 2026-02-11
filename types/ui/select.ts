export interface ISelectOption<TValue extends string> {
  value: TValue;
  label: string;
  disabled?: boolean;
}

export interface ISelectProps<TValue extends string> {
  id?: string;
  name?: string;
  value: TValue;
  onChange: (value: TValue) => void;
  options: Array<ISelectOption<TValue>>;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  describedById?: string;
  className?: string;
}
