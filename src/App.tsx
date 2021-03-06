import React from 'react'
import './range-input-style.css'
import './select-style.css'
import { useFormState } from 'react-use-form-state'
import { Grid } from '@material-ui/core'
import styles from './App.module.scss'
import { SliderWithInputGrid } from './SliderWithInput'
import { FormStateType } from './Types'

const strommingstapPr100mTabell = [
  [250, 0.25, undefined],
  [500, 1, 0.1],
  [1000, 4, 0.5],
  [1500, undefined, 1],
  [2000, undefined, 2],
]

const slangelengde = 25
// const vannveggForbruk = 800;

const LabelledField = (props: { label: string; children: React.ReactNode; id: string }) => (
  <Grid container>
    <Grid item xs={12} md={12} className={styles.labelContainer}>
      <label htmlFor={props.id}>{props.label}</label>
    </Grid>
    {props.children}
  </Grid>
)

const LabelledOutput = (props: { label: string; children: React.ReactNode }) => (
  <>
    <div className={styles.labelledField}>
      <dt>{props.label}</dt>
      <dd>{props.children}</dd>
    </div>
  </>
)

const LabelledDiv = (props: { label: string; children: React.ReactNode; className?: string; id: string }) => (
  <>
    <div className={props.className}>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      {props.children}
    </div>
  </>
)

LabelledDiv.defaultProps = {
  className: undefined,
}

const ValueWithUnit = ({ unit, className = '', value, stringifier = (n: number) => n.toFixed(0) }: { value: number; unit: string; stringifier?: (n: number) => string; className?: string }) => {
  return (
    <div className={`${styles.valueWithUnit} ${className}`}>
      {((isNaN(value) || value === undefined || value === null) && 'Ikke definert') || (
        <>
          <span className={`${styles.valueWithUnit}__value`}>{stringifier(value)}</span>
          <span className={`${styles.valueWithUnit}__unit`}>{unit}</span>
        </>
      )}
    </div>
  )
}

ValueWithUnit.defaultProps = {
  stringifier: undefined,
  className: undefined,
}

const App = () => {
  const [formState, { select }] = useFormState<FormStateType>({
    destinasjonTrykk: 5,
    avstand: 1,
    hoydeforskjell: 0,
    diameter: '4',
    vannmengde: '250',
    pumpetype: '10 bar',
  })
  let strommingstapPr100m: number | undefined
  const strommingstapRow = strommingstapPr100mTabell.find((row) => `${row[0]}` === formState.values.vannmengde)

  if (strommingstapRow) {
    if (formState.values.diameter === '2.5') {
      // eslint-disable-next-line
      strommingstapPr100m = strommingstapRow[1]
    } else {
      // eslint-disable-next-line
      strommingstapPr100m = strommingstapRow[2]
    }
  }

  let strommingstap
  const avstand = parseFloat(formState.values.avstand)
  const hoydeforskjell = parseFloat(formState.values.hoydeforskjell)
  if (strommingstapPr100m) {
    strommingstap = (strommingstapPr100m * avstand) / 100
  } else {
    strommingstap = undefined
  }

  const antallSlanger = Math.ceil(avstand / slangelengde)

  const hoydeTap = hoydeforskjell / 10

  const utgangstrykk = parseFloat(formState.values.destinasjonTrykk) + strommingstap + hoydeTap

  // const avstandRangeProps = {...range('avstand')};

  return (
    <div className={styles.app}>
      <main>
        <article>
          <>
            <h1>Destinasjon</h1>
            <section className={styles.horizontal}>
              <LabelledField label="??nsket vannmengde" id="vannmengde">
                <span className={styles.smallText}>Vannvegg: 800 l/min, str??ler??r: 500 l/min</span>
                <select {...select('vannmengde')} id="vannmengde">
                  <option value={250}>250 l/min</option>
                  <option value={500}>500 l/min</option>
                  <option value={1000}>1000 l/min</option>
                  <option value={1500}>1500 l/min</option>
                  <option value={2000}>2000 l/min</option>
                </select>
              </LabelledField>
              <SliderWithInputGrid formState={formState} valueName="destinasjonTrykk" label="??nsket trykk" min={1} max={10} step={1} unit="bar" />
            </section>
          </>
          <h1>Utlegg</h1>
          <section className={styles.horizontal}>
            <SliderWithInputGrid label="Avstand i m" valueName="avstand" formState={formState} min={0} max={3000} step={100} unit="m" />
            <SliderWithInputGrid formState={formState} valueName="hoydeforskjell" label="H??ydeforskjell i meter" min={-100} max={200} step={1} unit="m" />
            <LabelledDiv className="radioGroup" label="Slange" id="diameter">
              <select {...select('diameter')} id="diameter">
                <option value="2.5">2??"</option>
                <option value="4">4"</option>
              </select>
            </LabelledDiv>
          </section>
          <h1>Resultat</h1>
          <section className={styles.horizontal}>
            <LabelledOutput label="Str??mmingstap">
              <ValueWithUnit value={strommingstap} unit="bar" stringifier={(n: number) => n.toFixed(1)} />
            </LabelledOutput>
            <LabelledOutput label="H??ydetap">
              <span className={styles.radiolabel}>{hoydeTap} bar</span>
            </LabelledOutput>
          </section>
          <section className={styles.horizontal}>
            {/* <label>
              Pumpekapasitet<br/>
              <select {...select('pumpetype')}>
                <option value={"10 bar"}>10 bar (Ziegler)</option>
                <option value={"6 bar"}>6 bar (Otter)</option>
              </select>
            </label> */}
            <LabelledOutput label="N??dvendig utgangstrykk">
              <ValueWithUnit value={utgangstrykk} unit="bar" stringifier={(n) => n.toFixed(2)} />
            </LabelledOutput>
            <LabelledOutput label="Antall slanger">
              <span className={styles.radiolabel}>{antallSlanger}</span>
            </LabelledOutput>
          </section>
        </article>
      </main>
    </div>
  )
}

export default App
