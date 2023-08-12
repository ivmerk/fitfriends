import { ChangeEvent, useState } from 'react';

function useInput(
  initialValue: string,
  lengthMin = 0,
  lengthMax: number | undefined
) {
  const [value, setValue] = useState(initialValue);

  const defaultValidation =
    value.length >= lengthMin && (lengthMax ? value.length <= lengthMax : true);

  const [isValid, setIsValid] = useState(defaultValidation);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsValid(
      e.target.value.length >= lengthMin &&
        (lengthMax ? e.target.value.length <= lengthMax : true)
    );
  };

  const clear = () => setValue('');
  return {
    bind: { value, onChange },
    value,
    clear,
    isValid,
  };
}

export default useInput;
