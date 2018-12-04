// ConsumerAffairs - Main Javascript file

// Styles
import '../styles/main.scss'

// Formulas
import { principleInterest, tax, insurance, monthlyPayment } from './formulas'
import { validateForm } from './validate-form'

// App
;(() => {
  'use strict'

  // Simple console.log
  console.log('App working!')

  // Data Object
  let formData = {
    annualInsurance: '',
    annualTax: '',
    interestRate: '',
    loanAmount: '',
    yearsOfMortgage: ''
  }

  // Cache DOM
  const calculator = document.querySelector('.calculator')
  const calculatorResults = document.querySelector('.calculator__results')
  const buttonCalculate = document.querySelector('#buttonCalculate')
  const formMortgageCalculator = document.querySelector('#mortgageCalculator')
  const formRangeElements = document.querySelectorAll('input[type=range]')
  const formInputElements = document.querySelectorAll('input[type=text]')
  const resultPrincipleInterest = document.querySelector(
    '#resultPrincipleInterest'
  )
  const resultTax = document.querySelector('#resultTax')
  const resultInsurance = document.querySelector('#resultInsurance')
  const resultTotal = document.querySelector('#resultTotal')

  const bindEvents = () => {
    formMortgageCalculator.addEventListener('submit', submitForm)
    // Add eventListener to all range elements at once
    formRangeElements.forEach(input => {
      input.addEventListener('input', handleInputChange)
    })
    // Add eventListener to all input elements at once
    formInputElements.forEach(input => {
      input.addEventListener('keyup', handleInputChange)
    })
  }

  const submitForm = e => {
    e.preventDefault()

    // Call form validation before submitting form
    const validForm = validateForm(formData)

    if (validForm) {
      console.log('Time to do some math!')

      const inputPrincipleInterest = Number(principleInterest(formData))
      const inputTax = Number(tax(formData))
      const inputInsurance = Number(insurance(formData))
      const inputMonthlyPayment = Number(
        monthlyPayment(inputPrincipleInterest, inputTax, inputInsurance)
      )
      console.log('Principles & Interest', inputPrincipleInterest)
      console.log('Tax', inputTax)
      console.log('Insurance', inputInsurance)
      console.log('Monthly Payment', inputMonthlyPayment)

      // Apply result to DOM elements
      resultPrincipleInterest.innerHTML = `$ ${inputPrincipleInterest.toFixed(
        2
      )}`
      resultTax.innerHTML = `$ ${inputTax.toFixed(2)}`
      resultInsurance.innerHTML = `$ ${inputInsurance.toFixed(2)}`
      resultTotal.innerHTML = `$ ${inputMonthlyPayment.toFixed(2)}`

      // Change button label
      buttonCalculate.innerHTML = 'Recalculate'

      // Add class to trigger animation
      calculator.classList.add('results')

      // Add quick delay to wait result animation to complete
      setTimeout(() => {
        // Scroll to results
        calculatorResults.scrollIntoView({
          behavior: 'smooth'
        })
      }, 300)
    }
  }

  const handleInputChange = e => {
    const target = e.target

    // Check if it's a number, if not erase character (only for input text)
    target.value =
      target.type != 'range' ? target.value.replace(/[^\d]/, '') : target.value

    if (target.type === 'range') {
      const range =
        (target.value - target.getAttribute('min')) /
        (target.getAttribute('max') - target.getAttribute('min'))
      // Style to fill only the range selected
      target.setAttribute(
        'style',
        `background-image: -webkit-gradient(linear, left top, right top, color-stop(${range}, #0077c0), color-stop(${range}, #cbcbcb)`
      )
      // Grab input field to set range value
      const rangeInput = target.nextElementSibling.nextElementSibling
      rangeInput.value = target.value
    }

    // Update formData object
    updateForm({ [target.id]: Number(target.value) })
  }

  // Update form object as user inputs values
  const updateForm = inputValue => {
    let values = inputValue || {}
    // When app first load, grab default values from range inputs
    if (!inputValue) {
      formRangeElements.forEach(input => {
        // Grab input field to set range value
        const rangeInput = input.nextElementSibling.nextElementSibling
        rangeInput.value = Math.floor(input.value)
        values = { ...values, [input.id]: Number(rangeInput.value) }
      })
    }
    formData = {
      ...formData,
      ...values
    }
    console.log('FORM DATA', formData)
  }

  const render = () => {
    bindEvents()
    updateForm()
  }

  render()
})()
