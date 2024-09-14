import { Modal, Button } from '@mantine/core'
import LoginButton from './LoginButton'
import styles from './RegisterModal.module.css'

interface RegisterModalProps {
  show: boolean
  onClose: () => void
}

const RegisterModal = ({ show, onClose }: RegisterModalProps) => {
  if (show) {
    return (
      <Modal
        opened={show}
        onClose={onClose}
        title="Sign Up to Unlock Full Access!">
        <div className={styles.registerModal}>
          <p className={styles.text}>
            To create recipes and enjoy everything our site has to offer,
            you&apos;ll need to sign up. It&apos;s quick and easy—just log in
            with your Google account to get started!
          </p>
          <div className={styles.actions}>
            <LoginButton />
            <Button onClick={onClose} color="red" variant="subtle">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    )
  }

  return null
}

export default RegisterModal
