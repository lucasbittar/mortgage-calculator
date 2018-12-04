// ConsumerAffairs - Main Javascript file

// Styles
import '../styles/main.scss'

// Formulas
import { principleInterest, tax, insurance, monthlyPayment } from './formulas'
;(() => {
  'use strict'

  // Simple console.log
  console.log('App working!')

  // Data Object
  let formData = {}

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
    console.log('Time to do some math!')
    e.preventDefault()

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
    resultPrincipleInterest.innerHTML = `$ ${inputPrincipleInterest.toFixed(2)}`
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

  const handleInputChange = e => {
    const target = e.target

    // Check if it's a number, if not erase character (only for input text)
    target.value =
      target.type != 'range' ? target.value.replace(/[^\d]/, '') : target.value

    if (target.type === 'range') {
      // Grab input field to set range value
      const rangeInput = target.nextElementSibling.nextElementSibling
      rangeInput.value = target.value
    }

    // Update formData object
    updateForm({ [target.id]: Number(target.value) })
  }

  // Update form object as user inputs values
  const updateForm = value => {
    formData = {
      ...formData,
      ...value
    }
    console.log('FORM DATA', formData)
  }

  const render = () => {
    bindEvents()
  }

  render()
})()
