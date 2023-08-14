import { useState } from 'react';

function useDropdown(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setValue(e.currentTarget.value);
  };

  return {
    bind: { value, onClick },
    value,
  };
}

export default useDropdown;
