import "../styles/modal.scss"
import { Button } from "./Button"

interface props {
    buttons?: IButton[]
    children: JSX.Element | JSX.Element[]
    advert?: string
    onExit: () => void
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
    title: string
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


export const ModalParent = ({ children, buttons, onExit, title, onSubmit, advert }:props) => (
    <>
        <div className="modal">
            <div className="top">
                <h1>{title}</h1>
                <svg onClick={onExit} className="exit-btn" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            </div>

            <form onSubmit={onSubmit}>
                <div className="body">
                    {children}
                </div>

                <div className="bottom">
                    {
                        buttons?.map( ({color, label, disabled, onClick, status, style, submit}, index) => <Button
                            color={color}
                            label={label}
                            disabled={disabled}
                            onClick={onClick}
                            status={status}
                            style={style}
                            submit={submit}
                            key={index}
                        />)
                    }
                    {advert && <p style={{color:"#D71F1F"}}>{advert}</p>}
                </div>
            </form>

        </div>

        <div className="black-screen"></div>
    </>
)