import { useState } from "react";

export const useStatus = () => {
    const [error, setErr] = useState("");
    const [status, setStatus] = useState<undefined | "error" | "await" | "done">(undefined);
    const setError = (error: string) => {setErr(error); setStatus("error")};
    const onNotError = () => {setErr(""); setStatus(undefined)};

    return {
        error, status,
        setError, onNotError, setStatus
    }
}