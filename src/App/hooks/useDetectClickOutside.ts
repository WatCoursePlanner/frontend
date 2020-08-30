import React, {useEffect} from "react";

const useDetectClickOutside = (ref: React.MutableRefObject<any>, callback: () => any) => {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default useDetectClickOutside
