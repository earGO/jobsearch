import {useEffect, useState} from 'react'

const useDefaultInForm = (defaultValue, value) => {
	const [valueWithDefault, setvalueWithDefault] = useState(defaultValue)
	useEffect(() => {
		setvalueWithDefault(value)
	}, [value])
	useEffect(() => {
		setvalueWithDefault(defaultValue)
	}, [defaultValue])

	return valueWithDefault
}

export default useDefaultInForm
