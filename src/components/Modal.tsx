import "../styles/modal.scss"
import { Button } from "./Button"

interface props {
    children: JSX.Element | JSX.Element[]
    title: string
    onExit: () => void
    buttons: IButton[]
}
interface IButton {
    color: "secondary" | "primary" | ""
    disabled?: boolean
    label: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, ...any: any) => void
    status?: "error" | "await" | "done"
    style?: React.CSSProperties
    submit?: boolean
}


export const ModalExample = ({ children, buttons, onExit, title }:props) => (
    <>
        <div className="modal">
            <div className="top">
                <h1>{title}</h1>
                <svg onClick={onExit} className="exit-btn" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            </div>

            <div className="body">
                {children}
            </div>

            <div className="bottom">
                {
                    buttons.map( ({color, label, disabled, onClick, status, style, submit}) => <Button
                        color={color}
                        label={label}
                        disabled={disabled}
                        onClick={onClick}
                        status={status}
                        style={style}
                        submit={submit}
                    />)
                }
            </div>

        </div>

        <div className="black-screen"></div>
    </>
)