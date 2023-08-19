import { ChangeEvent, useState } from 'react';

function useDigitalInput(
  initialValue: string,
  min = 0,
  max: number | undefined
) {
  const [value, setValue] = useState(initialValue);

  const defaultValidation =
    parseInt(value, 10) >= min && (max ? parseInt(value, 10) <= max : true);

  const [isValid, setIsValid] = useState(defaultValidation);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsValid(
      parseInt(e.target.value, 10) >= min &&
        (max ? parseInt(e.target.value, 10) <= max : true)
    );
  };

  const clear = () => setValue('');
  return {
    bind: { value, onChange },
    value,
    clear,
    isValid,
    setValue,
  };
}

export default useDigitalInput;
