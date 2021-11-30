import React from 'react'
// import './App.scss'
import styles from './App.module.scss' // Import css modules stylesheet as styles
import './range-input-style.css'
import './select-style.css'
import omit from 'lodash/omit'
import { BaseInputProps, useFormState } from 'react-use-form-state'

const strommingstapPr100mTabell = [
  [250, 0.25, undefined],
  [500, 1, 0.1],
  [1000, 4, 0.5],
  [1500, undefined, 1],
  [2000, undefined, 2],
]

const slangelengde = 25
// const vannveggForbruk = 800;

console.log('App.tsx', 'Global')

const LabelledField = (props: { label: string; children: React.ReactNode }) => (
  <>
    <div className={styles.labelledField}>
      {props.label}
      <br />
      {props.children}
    </div>
  </>
)

const LabelledDiv = (props: { label: string; children: React.ReactNode; className?: string }) => (
  <>
    <div className={props.className}>
      {props.label}
      <br />
      {props.children}
    </div>
  </>
)

function RangeInput(props: BaseInputProps<any> & { displayValue: number; min: number; max: number; step: number; unit: string }) {
  return (
    <>
      <input {...omit(props, 'displayValue', 'unit')} />
      <ValueWithUnit value={props.displayValue} unit={props.unit} stringifier={(n) => n} />
    </>
  )
}

const ValueWithUnit = ({ unit, className = '', value, stringifier = (n) => n.toFixed(0) }: { value: number; unit: string; stringifier?: (n: any) => string; className?: string }) => {
  return (
    <div className={styles.valueWithUnit + ' ' + className}>
      {((isNaN(value) || value === undefined || value === null) && `Ikke definert`) || (
        <>
          <span className={styles.valueWithUnit + '__value'}>{stringifier(value)}</span>
          <span className={styles.valueWithUnit + '__unit'}>{unit}</span>
        </>
      )}
    </div>
  )
}

const App = () => {
  console.log('App.tsx', 'App')
  const [formState, { select, range }] = useFormState({
    destinasjonTrykk: 5,
    avstand: 1,
    hoydeforskjell: 0,
    diameter: '4',
    vannmengde: '250',
    pumpetype: '10 bar',
  })
  let strommingstapPr100m: number | undefined = undefined
  const strommingstapRow = strommingstapPr100mTabell.find((row) => row[0] + '' === formState.values.vannmengde)

  if (strommingstapRow) {
    if (formState.values.diameter === '2.5') {
      strommingstapPr100m = strommingstapRow[1]
    } else {
      strommingstapPr100m = strommingstapRow[2]
    }
  }

  let strommingstap
  if (strommingstapPr100m) {
    strommingstap = (strommingstapPr100m * parseFloat(formState.values.avstand)) / 100
  } else {
    strommingstap = undefined
  }

  const antallSlanger = Math.ceil(formState.values.avstand / slangelengde)

  const hoydeTap = formState.values.hoydeforskjell / 10

  const utgangstrykk = parseFloat(formState.values.destinasjonTrykk) + strommingstap + hoydeTap
  return (
    <div className={styles.app}>
      <main>
        <article>
          <>
            <h1>Destinasjon</h1>
            <section className={styles.horizontal}>
              <LabelledField label={'Ønsket vannmengde'}>
                <span className={styles.smallText}>Vannvegg: 800 l/min, strålerør: 500 l/min</span>
                <select {...select('vannmengde')}>
                  <option value={250}>250 l/min</option>
                  <option value={500}>500 l/min</option>
                  <option value={1000}>1000 l/min</option>
                  <option value={1500}>1500 l/min</option>
                  <option value={2000}>2000 l/min</option>
                </select>
              </LabelledField>
              <LabelledField label={'Ønsket trykk'}>
                <RangeInput {...range('destinasjonTrykk')} max={10} min={1} step={1} unit={'bar'} displayValue={formState.values.destinasjonTrykk} />
              </LabelledField>
            </section>
          </>
          <h1>Utlegg</h1>
          <section className={styles.horizontal}>
            <LabelledField label={'Avstand i m'}>
              <RangeInput {...range('avstand')} unit={'m'} displayValue={formState.values.avstand} min={0} max={1000} step={100} />
            </LabelledField>
            <LabelledField label={'Høydeforskjell i meter'}>
              <RangeInput {...range('hoydeforskjell')} unit={'m'} displayValue={formState.values.hoydeforskjell} min={-100} max={200} step={1} />
            </LabelledField>
            <LabelledDiv className={'radioGroup'} label={'Slange'}>
              <select {...select('diameter')}>
                <option value={'2.5'}>2½"</option>
                <option value={'4'}>4"</option>
              </select>
            </LabelledDiv>
          </section>
          <h1>Resultat</h1>
          <section className={styles.horizontal}>
            <LabelledField label={'Strømmingstap:'}>
              <ValueWithUnit value={strommingstap} unit={'bar'} stringifier={(n) => n} />
            </LabelledField>
            <LabelledField label={'Høydetap:'}>
              <span className={styles.radiolabel}>{hoydeTap} bar</span>
            </LabelledField>
          </section>
          <section className={styles.horizontal}>
            {/*<label>
              Pumpekapasitet<br/>
              <select {...select('pumpetype')}>
                <option value={"10 bar"}>10 bar (Ziegler)</option>
                <option value={"6 bar"}>6 bar (Otter)</option>
              </select>
            </label>*/}
            <LabelledField label={'Nødvendig utgangstrykk'}>
              <ValueWithUnit value={utgangstrykk} unit={'bar'} stringifier={(n) => n.toFixed(2)} />
            </LabelledField>
            <LabelledField label={'Antall slanger:'}>
              <span className={styles.radiolabel}>{antallSlanger}</span>
            </LabelledField>
          </section>
        </article>
      </main>
    </div>
  )
}

export default App
