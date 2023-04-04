import "../styles/btn.scss";

interface props {
    color: "secondary" | "primary" | "alert" | ""
    disabled?: boolean
    label: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, ...any: any) => void
    status?: "error" | "await" | "done"
    style?: React.CSSProperties
    submit?: boolean
}

export const Button = ({
    color,
    disabled,
    label,
    onClick,
    status,
    style,
    submit,
}: props) => (
    <button
        className={`btn 
            ${color === "primary" ? "primary" : ""}
            ${color === "secondary" ? "secondary" : ""}
            ${color === "alert" ? "alert" : ""}
        `}
        disabled={disabled || !!status}
        onClick={onClick}
        style={style}
        type={submit ? "submit" : "button"}
    >
        {
            status ?
                <>
                    {
                        status === "error" ?
                        <>
                            <svg width="1em" height="1em" style={{fontSize:"1.3em", color:"#f76a6a"}} viewBox="0 0 384 512">
                                <path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                            Error
                        </>

                        : status === "done" ?
                        <>
                            <svg width="1em" height="1em" style={{fontSize:"1.4em", color:"#7dbf78"}} viewBox="0 0 448 512">
                                <path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                            Hecho
                        </>

                        : status === "await" ?
                        <>
                            <svg className="animationRotation360" width="1em" height="1em" style={{fontSize:"1.4em", color:"#afb4bc"}} viewBox="0 0 512 512">
                                <path fill="currentColor" d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>
                        </>
                        : null
                    }
                </>
            : label
        }
    </button>
)