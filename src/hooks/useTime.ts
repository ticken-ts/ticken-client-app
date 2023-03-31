import { useEffect, useState } from "react";

export const useTime = (freqMillis = 1000) => {
    const [time, setTime] = useState(new Date().getTime());
    useEffect(() => {
        const interval = setInterval(() => {
        setTime(new Date().getTime());
        }, freqMillis);
        return () => clearInterval(interval);
    }, [freqMillis]);
    return time;
}