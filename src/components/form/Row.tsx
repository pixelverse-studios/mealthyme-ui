import styles from './Form.module.scss'

const FormRow = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div className={styles.FormRow}>{children}</div>
)
export default FormRow
