import {
  useState,
  useEffect,
  useReducer,
  useMemo,
  ChangeEventHandler,
  FormEvent
} from 'react'

const ERROR = 'error'

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
      const { name, value, msgType, valid } = action.payload

      return { ...state, [name]: { value, msgType, valid } }
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
    const { message, test } = validations[name]
    const valid = test(value)

    dispatch({
      type: UPDATE,
      payload: {
        name,
        value,
        msgType: valid ? '' : message,
        valid
      }
    })
  }

  const handleNonFormEventChange = (data: any, name: string) => {
    let valid = true
    let statusMessage = ''
    if (validations[name]) {
      const { message, test } = validations[name]
      statusMessage = message
      valid = test(data)
    }

    dispatch({
      type: UPDATE,
      payload: {
        message: valid ? '' : statusMessage,
        msgType: valid ? '' : ERROR,
        name,
        valid,
        value: data
      }
    })
  }

  const handleValidation = (event: any) => {
    const { value, name } = event.target
    const { message, test } = validations[name]
    const valid = test(value)

    dispatch({
      type: UPDATE,
      payload: {
        message: valid ? '' : message,
        msgType: valid ? '' : ERROR,
        name,
        valid,
        value
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

  const isFormValid = useMemo(() => {
    const hasErrors = Object.keys(form).every(
      label => form[label].valid === false
    )
    const requiredFieldsValid = Object.keys(validations).every(
      key => validations[key].required && form[key].valid
    )
    return !hasErrors && requiredFieldsValid
  }, [form, validations])

  return {
    disableSubmit,
    form,
    formLoading,
    handleChange,
    handleClearField,
    handleFormSubmit,
    handleValidation,
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
