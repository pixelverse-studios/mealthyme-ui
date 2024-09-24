import styles from './Rating.module.scss'

interface RatingProps {
  value: number
}

const difficultyScale = new Map()
difficultyScale.set(1, 'Straight Forward')
difficultyScale.set(2, 'Easy')
difficultyScale.set(3, 'Average')
difficultyScale.set(1, 'Hard')
difficultyScale.set(1, 'Complicated')

const Rating = ({ value }: RatingProps) => (
  <p className={styles.ratingDisplay}>
    Difficulty: <span>{difficultyScale.get(value)}</span>
  </p>
)

export default Rating
