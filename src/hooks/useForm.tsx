import {
  useState,
  useEffect,
  useReducer,
  ChangeEventHandler,
  FormEvent
} from 'react'

export const FORM_ACTIONS = {
  UPDATE: 'UPDATE',
  RESET: 'RESET',
  IMPORT: 'IMPORT'
}

interface ActionState {
  type: string
  payload?: any
}
const { UPDATE, RESET, IMPORT } = FORM_ACTIONS

function reducer(state: any, action: ActionState) {
  switch (action.type) {
    case UPDATE: {
      const { name, value, error } = action.payload

      return { ...state, [name]: { value, error } }
    }
    case IMPORT: {
      return { ...state, ...action.payload }
    }
    case RESET: {
      return action.payload
    }
    default:
      return state
  }
}

const useForm = (initialState: any, validations: any, store?: any) => {
  const [form, dispatch] = useReducer(reducer, initialState)
  const [formLoading, setFormLoading] = useState<boolean>(false)
  const [isDataImported, setIsDataImported] = useState<boolean>(false)
  const [disableSubmit, setDisableSumit] = useState<boolean>(true)

  useEffect(() => {
    if (store != null) {
      const formFieldStatus = Object.entries(form).map(
        ([key, field]: [key: string, value: any]) => store[key] === field.value
      )
      setDisableSumit(!formFieldStatus.some(field => !field))
    }
  }, [store, form])

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { value, name } = event.target

    const error = !validations[name]?.test(value.trim())
      ? validations[name]?.message
      : ''

    dispatch({
      type: UPDATE,
      payload: {
        name,
        value,
        error
      }
    })
  }

  const handleNonFormEventChange = (data: any, name: string) => {
    const hasValidation = validations[name]?.message

    dispatch({
      type: UPDATE,
      payload: {
        name,
        value: data,
        error: hasValidation ? !validations[name].test(data) : ''
      }
    })
  }

  const handleClearField = (fieldLabel: string) =>
    dispatch({
      type: UPDATE,
      payload: {
        name: fieldLabel,
        value: initialState[fieldLabel],
        error: ''
      }
    })

  const handleImport = (payload: any) => {
    setIsDataImported(true)
    const formattedData = {} as any
    for (const [key, value] of Object.entries(payload)) {
      formattedData[key] = { value, error: '' }
    }
    dispatch({ type: IMPORT, payload: formattedData })
  }

  const handleFormSubmit = async (
    event: FormEvent<HTMLFormElement>,
    mutation: () => null
  ) => {
    event.preventDefault()
    setFormLoading(true)
    await mutation()
    setFormLoading(false)
  }

  const handleReset = () => {
    dispatch({ type: RESET, payload: initialState })
  }

  const isFormValid = Object.keys(form).every(label => !form[label].error)

  return {
    disableSubmit,
    form,
    formLoading,
    handleChange,
    handleClearField,
    handleFormSubmit,
    handleImport,
    handleNonFormEventChange,
    handleReset,
    isDataImported,
    isFormValid,
    setFormLoading,
    setIsDataImported
  }
}

export default useForm
