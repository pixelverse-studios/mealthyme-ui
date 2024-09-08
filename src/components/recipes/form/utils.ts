import stripTypenames from '../../../utils/stripTypenames'
import StringUtils from '../../../utils/validations/strings'

export const initialRecipeForm = {
  title: { value: '', valid: null },
  servings: { value: '', valid: null },
  ingredients: { value: [], valid: null },
  instructions: { value: [], valid: null },
  allergies: { value: [], valid: null },
  category: { value: null, valid: null },
  difficulty: { value: 0, valid: null },
  prepTime: { value: '', valid: null },
  cookTime: { value: '', valid: null },
  tags: { value: [], valid: null },
  image: { value: '', valid: null },
  imgPublicId: { value: '', valid: null }
}

export const recipeFormValidations = {
  title: {
    required: true,
    message: 'A title is required',
    test: (title: string): boolean => StringUtils.isValid(title)
  },
  servings: {
    required: true,
    message: 'A serving size is required, and must be greater than 0. ',
    test: (servings: number) => servings > 0
  },
  ingredients: {
    required: true,
    message: 'At least one ingredient is required',
    test: (ingredients: any) => ingredients.every((ingr: any) => ingr.name)
  },
  instructions: {
    required: true,
    message: 'At least one instruction is required',
    test: (instructions: string[]) =>
      instructions.every((instr: any) => StringUtils.isValid(instr))
  },
  category: {
    required: true,
    message: 'A category is required',
    test: (category: { label: string }) => StringUtils.isValid(category.label)
  },
  difficulty: {
    required: true,
    method: 'A difficulty rating of 0 to 5 is required',
    test: (difficulty: number) => difficulty >= 0
  },
  prepTime: {
    required: true,
    method: 'A prep time of at least 0 minutes is required',
    test: (prepTime: number) => prepTime >= 0
  },
  cookTime: {
    required: true,
    method: 'A cook time of at least 0 minutes is required',
    test: (cookTime: number) => cookTime >= 0
  }
}

export const sanitizeNewRecipe = (
  payload: any,
  imgSrc: string,
  imgPublicId: string
) => {
  console.log(payload.ingredients)
  return {
    allergies: stripTypenames(payload.allergies.value),
    category: stripTypenames(payload.category.value._id),
    cookTime: stripTypenames(parseFloat(payload.cookTime.value)),
    difficulty: stripTypenames(payload.difficulty.value),
    image: { src: imgSrc, publicId: imgPublicId },
    ingredients: stripTypenames(payload.ingredients.value),
    instructions: payload.instructions.value,
    prepTime: payload.prepTime.value,
    servings: payload.servings.value,
    tags: payload.tags.value,
    title: payload.title.value
  }
}
