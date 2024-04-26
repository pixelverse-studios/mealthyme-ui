'use client'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import Drawer from '../drawer'
import { recipeLinks, resources, NavItemType } from './utils'
import { setShowMobile } from '@/lib/redux/slices/nav'
import styles from './Nav.module.scss'

const RECIPE_BLOCK = 'recipes'
const RESOURCE_BLOCK = 'resources'
const isExpanded = (panel: string, panels: string[]) => panels.includes(panel)

function SideNav() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { profile } = useSelector((state: any) => state.user)
  const { isMobile, showMobile } = useSelector((state: any) => state.nav)
  const [accordions, setAccordions] = useState<string[]>([RECIPE_BLOCK])

  const onAccordionClick = (panel: string) => {
    if (accordions.includes(panel)) {
      setAccordions(accordions.filter(item => item !== panel))
    } else {
      setAccordions([...accordions, panel])
    }
  }

  const onItemClick = (route: string) => router.push(route)
  const onDrawerClose = () => {
    if (!isMobile) return
    dispatch(setShowMobile(false))
  }

  return (
    <Drawer open={showMobile} onClose={onDrawerClose} overlayContent={isMobile}>
      <div className={styles.SideNav}>
        <Accordion
          className={`${styles.accordion} ${isExpanded(RECIPE_BLOCK, accordions) ? styles.expanded : ''}`}
          expanded={isExpanded(RECIPE_BLOCK, accordions)}
          onChange={() => onAccordionClick(RECIPE_BLOCK)}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={RECIPE_BLOCK}
            id={RECIPE_BLOCK}>
            Recipes
          </AccordionSummary>
          <AccordionDetails className={styles.links}>
            {recipeLinks(profile?._id != '').map(
              ({ label, route }: NavItemType) => (
                <div onClick={() => onItemClick(route)} key={label}>
                  {label}
                </div>
              )
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={`${styles.accordion} ${
            isExpanded(RESOURCE_BLOCK, accordions) ? styles.expanded : ''
          }`}
          expanded={isExpanded(RESOURCE_BLOCK, accordions)}
          onChange={() => onAccordionClick(RESOURCE_BLOCK)}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={RESOURCE_BLOCK}
            id={RESOURCE_BLOCK}>
            Resources
          </AccordionSummary>
          <AccordionDetails className={styles.links}>
            {resources(profile?._id != '').map(
              ({ label, route }: NavItemType) => (
                <div onClick={() => onItemClick(route)} key={label}>
                  {label}
                </div>
              )
            )}
          </AccordionDetails>
        </Accordion>
        <footer>&copy; MealThyme {new Date().getFullYear()}</footer>
      </div>
    </Drawer>
  )
}

export default SideNav
