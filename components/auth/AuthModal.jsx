import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Styles from '@styles/auth/AuthModal.module.css'

const AuthModal = ({children, setModal, showModal, resetPass}) => {
    const Router = useRouter()
    return(
        <>
            <Modal centered show={showModal} onHide={() => setModal({show: false, error: false})}>
                <Modal.Header className={Styles.modalHeader}>
                    <Icon className={Styles.modalClose} onClick={() => setModal({show: false, error: false})} icon="ant-design:close-outlined" />
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                {resetPass ?
                    <Modal.Footer className={Styles.modalFooter}>
                        <button className={Styles.buttonOne} onClick={() => Router.push('/')}>Back to Home</button>
                        <button className={Styles.buttonTwo} onClick={() => Router.push('/login')}>Login Now</button>
                    </Modal.Footer>
                :
                    <span></span>
                }
            </Modal>
        </>
    )
}

export default AuthModal