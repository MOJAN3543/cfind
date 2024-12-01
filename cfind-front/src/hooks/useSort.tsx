import { useState } from "react"

type UseSortReturnType<T> = [Array<T>, (compareFunc:((a: T, b: T) => number) | undefined) => void, (arg0: Array<T>) => void]

export const useSort = <T,>(init: Array<T>): UseSortReturnType<T> => {
    const [array, setArray] = useState<Array<T>>(init);

    const sortArray = (compareFunc: ((a: T, b: T) => number) | undefined) => {
        const sortedArray = array.sort(compareFunc);
        setArray([...sortedArray])
    }

    return [array, sortArray, setArray]
}