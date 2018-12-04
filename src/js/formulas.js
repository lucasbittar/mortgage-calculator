// ConsumerAffairs - Formulas

// Principles & Interest
export const principleInterest = ({
  interestRate,
  loanAmount,
  yearsOfMortgage
}) => {
  return (
    interestRate /
    100 /
    12 *
    loanAmount /
    (1 - Math.pow(1 + interestRate / 100 / 12, -yearsOfMortgage * 12))
  ).toFixed(2)
}

// Tax
export const tax = ({ annualTax }) => (annualTax / 12).toFixed(2)

// Insurance
export const insurance = ({ annualInsurance }) =>
  (annualInsurance / 12).toFixed(2)

// Monthly payment
export const monthlyPayment = (principleInterest, tax, insurance) => {
  return principleInterest + tax + insurance
}
