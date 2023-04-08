import { useState } from "react";

export function useLoading(defaultLoading = false) {

    const [loading, setLoading] = useState(defaultLoading);

    const load = <T, >(asyncFn: (data: T) => Promise<any>) => {
        return async (data: T) => {
            setLoading(true);
            await asyncFn(data);
            setLoading(false);
        }
    }

    return { loading, load };
    
}