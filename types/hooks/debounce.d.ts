declare const useDebounce: <T>(value: T, setValue: (val: T) => void, delay: number) => [T, (val: T) => void];
export default useDebounce;
