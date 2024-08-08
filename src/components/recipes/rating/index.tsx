import styles from './Rating.module.scss'

interface RatingProps {
  value: number
}

const Rating = ({ value }: RatingProps) => (
  <p className={styles.ratingDisplay}>
    <em>{value}</em>/5 stars
  </p>
)

export default Rating
