// ConsumerAffairs - Form Validation

export const validateForm = formData => {
  console.log('Start some validation')

  const invalidInputs = []

  // Cycle through keys and values and checks if empty
  // If so, populate the 'invalidInputs' array and add 'error' class to form-group
  Object.keys(formData).forEach((k, i) => {
    const value = formData[k]

    // Clear error class from all inputs
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
