import React from 'react'
import FormItem from './FormItem'
import createDOMForm from 'rc-form/lib/createDOMForm'
import createFormField from 'rc-form/lib/createFormField'

export const FIELD_META_PROP = 'form-item-meta'
export const FIELD_DATA_PROP = 'form-item-data'

class Form extends React.Component {
	static create = options =>
		createDOMForm({
			fieldNameProp: 'id',
			...options,
			fieldMetaProp: FIELD_META_PROP,
			fieldDataProp: FIELD_DATA_PROP
		})

	static createFormField = createFormField

	render() {
		return <form {...this.props} />
	}
}

Form.Item = FormItem

/** @component */
export default Form
