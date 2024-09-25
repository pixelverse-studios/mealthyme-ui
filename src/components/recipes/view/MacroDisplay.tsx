import NumberUtils from '../../../utils/numbers'
import styles from './RecipeView.module.scss'

type MacroDisplayProps = {
  label: string
  value: number
  servings: number
}

const MacroDisplay = ({ label, value, servings }: MacroDisplayProps) => {
  return (
    <div className={styles.macroDisplay}>
      <label>{label}</label>
      <hr />
      <span>{NumberUtils.handleRoundNumber(value / servings)}</span>
    </div>
  )
}

export default MacroDisplay
