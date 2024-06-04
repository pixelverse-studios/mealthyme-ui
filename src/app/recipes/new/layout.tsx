import { ReactNode } from 'react'
import styles from './NewRecipe.module.scss'

export default function NewRecipeLayout({ children }: { children: ReactNode }) {
  return <div className={styles.NewRecipePage}>{children}</div>
}
