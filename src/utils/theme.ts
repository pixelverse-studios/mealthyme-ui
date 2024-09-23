// theme.ts
import { MantineThemeOverride, MantineColorsTuple } from '@mantine/core'

// Optional: Module augmentation (if TypeScript complains about color keys)
declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<string, MantineColorsTuple>
  }
}

const myCustomColors = {
  primary: [
    '#d8dfd8',
    '#c9d2c9',
    '#bac5ba',
    '#abb8ab',
    '#9cac9c',
    '#86a286',
    '#789278',
    '#6a826a',
    '#5c725c',
    '#4e624e'
  ] as MantineColorsTuple,
  secondary: [
    '#d5d6dc',
    '#c6c7d1',
    '#b7b9c6',
    '#a8aab9',
    '#999bad',
    '#76788f',
    '#686a80',
    '#5a5b71',
    '#4c4d62',
    '#3e3f53'
  ] as MantineColorsTuple,
  accent: [
    '#f8ddd5',
    '#f3cdc3',
    '#eebdb1',
    '#e9ae9f',
    '#e49e8d',
    '#e08d6c',
    '#ca8161',
    '#b47556',
    '#9e694b',
    '#885d40'
  ] as MantineColorsTuple
}

export const themeOverride: MantineThemeOverride = {
  colors: myCustomColors,
  primaryColor: 'primary',
  primaryShade: 5
}
