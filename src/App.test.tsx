import { fireEvent, render, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import React from 'react'

const getDefinitionValue = (rendered: RenderResult, term: string) => {
  const terms = rendered.getAllByRole('term')
  const termComponent = terms.find((x) => x.textContent === term)
  if (termComponent === undefined) throw Error(`term '${term}' not found`)
  const details = termComponent.nextElementSibling
  if (details?.tagName !== 'DD') {
    throw new Error('No definition detail found for definition term ' + term)
  }
  return details
}

const setRangeInput = (rangeInput: HTMLElement, value: number) => {
  fireEvent.change(rangeInput, { target: { value: value, valueAsNumber: value } })
}

describe('App tests', () => {
  it('should render', () => {
    const rendered = render(<App />)
    expect(rendered.queryByText('Destinasjon')).toBeInTheDocument()
    expect(rendered.queryByText('Utlegg')).toBeInTheDocument()
    expect(rendered.queryByText('Resultat')).toBeInTheDocument()
    expect(rendered).toMatchSnapshot()
  })

  it('should calculate correct result', () => {
    const rendered = render(<App />)

    userEvent.selectOptions(rendered.getByLabelText('Ønsket vannmengde'), '500 l/min')
    setRangeInput(rendered.getByLabelText('Ønsket trykk'), 4)
    setRangeInput(rendered.getByLabelText('Avstand i m'), 200)
    setRangeInput(rendered.getByLabelText('Høydeforskjell i meter'), 10)
    userEvent.selectOptions(rendered.getByLabelText('Slange'), '4"')

    expect(getDefinitionValue(rendered, 'Strømmingstap')).toHaveTextContent('0.2bar')
    expect(getDefinitionValue(rendered, 'Nødvendig utgangstrykk')).toHaveTextContent('5.20bar')
    expect(getDefinitionValue(rendered, 'Høydetap')).toHaveTextContent('1 bar')
    expect(getDefinitionValue(rendered, 'Antall slanger')).toHaveTextContent('8')
  })
})
