import "./config.scss"
import { Button } from "./components/Button"
import { BtnIcon } from "./components/BtnIcon"

export const DevApp = () => {
    return (
        <div style={{display: "flex"}}>

            {/* <ModalExample/> */}
            <Button color="primary" label="Confirm" status="await"/>
            <Button color="primary" label="Confirm" status="done"/>
            <Button color="primary" label="Confirm" status="error"/>
            <Button color="primary" label="Confirm" />
            <Button color="primary" label="Confirm" />
            <Button color="secondary" label="Confirm" disabled />
            <Button color="secondary" label="Confirm" />
            <BtnIcon element="pencil"/>
            <BtnIcon element="trash"/>
            <BtnIcon element="xmark"/>
            <BtnIcon element="pencil" status="await"/>
            <BtnIcon element="trash" status="error"/>
            <BtnIcon element="xmark" status="done"/>
        </div>
    )
}