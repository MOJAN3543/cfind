import { createContext, useState } from "react";

type FilterQuery = {
    [key: string]: Set<String>;
}

type FilterContextType = {
    filter: FilterQuery;
    setFilter: (key: string, value: Set<String>) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const FilterContextProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [filter, setAllFilter] = useState<FilterQuery>({});

    const setFilter = (key: string, value: Set<String>) => {
        setAllFilter((prevFilter) => ({
            ...prevFilter,
            [key]: new Set(value),
        }));
    }

    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            {children}
        </FilterContext.Provider>
    )
}

export { FilterContext, FilterContextProvider }