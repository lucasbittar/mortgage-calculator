// ConsumerAffairs - Form Validation

export const validateForm = (formData) => {
  console.log('Start some validation', formData)

  const invalidInputs = []

  Object.keys(formData).forEach((k, i) => {
    const value = formData[k]

    // Clear error class
    document
      .querySelector(`#${k}`)
      .parentNode.parentNode.classList.remove('error')

    if (value === '' || value === 0) {
      invalidInputs.push(k)
      document
        .querySelector(`#${k}`)
        .parentNode.parentNode.classList.add('error')
    }
  })

  console.log('Invalid Inputs', invalidInputs)
  return invalidInputs.length > 0 ? false : true
}
