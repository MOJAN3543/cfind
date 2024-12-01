import { useState } from "react"

type UseToggleReturnType = [boolean, () => void]

export const useToggle = (init: boolean): UseToggleReturnType => {
    const [toggle, setToggle] = useState<boolean>(init);

    const handleToggle = () => {
        const toggled = !toggle;
        setToggle(toggled);
    }

    return [toggle, handleToggle];
}