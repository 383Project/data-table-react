import { useState, useEffect } from "react";

const useDebounce = <T>(
    value: T,
    setValue: (val: T) => void,
    delay: number
): [T, (val: T) => void] => {
    const [display, setDisplay] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, setValue, delay]);

    return [display, setDisplay];
};

export default useDebounce;
