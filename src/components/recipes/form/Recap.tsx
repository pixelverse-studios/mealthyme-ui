'use client'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'

import { useRecipeStore } from '../../../lib/store'
import NumberUtils from '../../../utils/numbers'
import StringUtils from '../../../utils/validations/strings'
import { RECIPE_ROUTES } from '../../nav/utils'
import styles from './RecipeForm.module.scss'

const RecipeRecap = () => {
  const { recap } = useRecipeStore()
  const router = useRouter()

  const onGoToFeed = () => router.push(RECIPE_ROUTES.mine)

  const onGoToCreate = () => router.push('/recipes/new')

  const chartData = useMemo(
    () =>
      Object.entries(recap?.macros ?? {})
        .map(([key, data]: [key: string, value: any], index: number) => ({
          id: index,
          value: NumberUtils.handleRoundNumber(data),
          label: StringUtils.capitalizeFirstLetters(key)
        }))
        .filter(item => item.label !== 'Calories'),
    [recap.macros]
  )

  return (
    <section className={styles.recipeRecap}>
      <h2>{recap.title} has been created!</h2>
      <h4>Some stats for the nerds:</h4>
      <div className={styles.charts}>
        <PieChart
          height={300}
          width={400}
          series={[
            {
              id: 'Macros',
              arcLabel: item => (item.value === 0 ? null : item.value),
              data: chartData,
              innerRadius: 35,
              outerRadius: 110,
              paddingAngle: 0,
              cornerRadius: 5,
              startAngle: -180,
              endAngle: 180,
              cx: 150,
              cy: 150
            }
          ]}
        />
      </div>
      <div className={styles.actions}>
        <Button variant="contained" color="primary" onClick={onGoToCreate}>
          Create another recipe
        </Button>
        <Button variant="contained" color="secondary" onClick={onGoToFeed}>
          Back to my feed
        </Button>
      </div>
    </section>
  )
}

export default RecipeRecap
