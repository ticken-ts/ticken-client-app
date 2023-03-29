import { useState } from "react";

export function useLoading(defaultLoading = false) {

    const [loading, setLoading] = useState(defaultLoading);

    const load = (asyncFn: () => Promise<any>) => {
        return async () => {
            setLoading(true);
            await asyncFn();
            setLoading(false);
        }
    }

    return { loading, load };
    
}