import { ChangeEvent, useState } from 'react';

function useTextarea(
  initialValue: string,
  lengthMin = 0,
  lengthMax: number | null
) {
  const [value, setValue] = useState(initialValue);

  const defaultValidation =
    value.length >= lengthMin && (lengthMax ? value.length <= lengthMax : true);

  const [isValid, setIsValid] = useState(defaultValidation);
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setIsValid(
      value.length >= lengthMin &&
        (lengthMax ? value.length <= lengthMax : true)
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

export default useTextarea;
