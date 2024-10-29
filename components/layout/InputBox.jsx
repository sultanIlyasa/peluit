import Styles from '@styles/layout/InputBox.module.css'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useState } from 'react'

const InputBox = ({label, register, name, type, placeHolder, error, disabled, forgetpass}) => {
    const [show, setShow] = useState(false)
    return(
        <>
            <div className="mb-3">
                <div className={Styles.labelGroup}>
                    <label className={`form-label ${Styles.inputLabel}`}>{label}</label>
                </div>
                <input 
                    {...register(name)} 
                    type={type !== "password" ? type : !show ? type : "text"} 
                    className={`form-control ${Styles.inputBox} ${error[name] ? Styles.inputErr : ""}`} 
                    placeholder={placeHolder}
                    style={{width: "100%"}}
                    disabled={disabled}
                    autoComplete="off"
                    spellCheck="false"
                />
                <p className={Styles.messageErr}>
                    {error[name] ? error[name].message : ""}
                </p>
            </div>
        </>
    )
}

export default InputBox