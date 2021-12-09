import React from 'react'
// import './App.scss'
import styles from './App.module.scss' // Import css modules stylesheet as styles
import './range-input-style.css'
import './select-style.css'
import { FormState, useFormState } from 'react-use-form-state'
import { Grid, Input, InputAdornment, Slider } from '@material-ui/core'

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

type ReactNodeWrapper = (element: React.ReactNode) => React.ReactNode

function SliderWithInput(props: {
  formState: FormState<any>
  valueName: string
  unit?: string
  sliderWrapper?: ReactNodeWrapper
  inputWrapper?: ReactNodeWrapper
  max: number
  min: number
  step?: number
}) {
  const sliderWrapper = props.sliderWrapper || ((el) => el)
  const inputWrapper = props.inputWrapper || ((el) => el)
  const value = props.formState.values[props.valueName]
  const ariaValueText = (value) => `${value}${(props.unit && ' ' + props.unit) || ''}`

  return (
    <>
      {sliderWrapper(
        <Slider
          value={value}
          getAriaValueText={ariaValueText}
          color="secondary"
          min={props.min}
          max={props.max}
          step={props.step}
          name={props.valueName}
          onChange={(event, newValue) => {
            props.formState.setField(props.valueName, newValue)
          }}
        />
      )}
      {inputWrapper(
        <Input
          id={props.valueName}
          value={value}
          onChange={(event) => {
            props.formState.setField(props.valueName, event.target.value === '' ? '' : Number(event.target.value))
          }}
          endAdornment={props.unit && <InputAdornment position="end">{props.unit}</InputAdornment>}
          // onBlur={handleBlur}
          inputProps={{
            // step: 10,
            // min: 0,
            // max: 100,
            type: 'number',
            // 'aria-labelledby': 'input-slider',
          }}
        />
      )}
    </>
  )
}

function SliderWithInputGrid(props: { formState: FormState<any>; valueName: string; label: string; min: number; max: number; step: number; unit: string }) {
  return (
    <Grid container>
      <Grid item xs={12} md={12} className={styles.labelContainer}>
        <label htmlFor={props.valueName}>{props.label}</label>
      </Grid>

      <SliderWithInput
        formState={props.formState}
        unit={props.unit}
        valueName={props.valueName}
        min={props.min}
        max={props.max}
        step={props.step}
        sliderWrapper={(slider) => (
          <Grid container item xs={8} alignItems={'center'}>
            {slider}
          </Grid>
        )}
        inputWrapper={(input) => (
          <Grid container item xs={4}>
            {input}
          </Grid>
        )}
      />
    </Grid>
  )
}

const App = () => {
  const [formState, { select }] = useFormState({
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

  // const avstandRangeProps = {...range('avstand')};

  return (
    <div className={styles.app}>
      <main>
        <article>
          <>
            <h1>Destinasjon</h1>
            <section className={styles.horizontal}>
              <LabelledField label={'Ønsket vannmengde'} id={'vannmengde'}>
                <span className={styles.smallText}>Vannvegg: 800 l/min, strålerør: 500 l/min</span>
                <select {...select('vannmengde')} id={'vannmengde'}>
                  <option value={250}>250 l/min</option>
                  <option value={500}>500 l/min</option>
                  <option value={1000}>1000 l/min</option>
                  <option value={1500}>1500 l/min</option>
                  <option value={2000}>2000 l/min</option>
                </select>
              </LabelledField>
              <SliderWithInputGrid formState={formState} valueName={'destinasjonTrykk'} label={'Ønsket trykk'} min={1} max={10} step={1} unit={'bar'} />
            </section>
          </>
          <h1>Utlegg</h1>
          <section className={styles.horizontal}>
            <SliderWithInputGrid label={'Avstand i m'} valueName={'avstand'} formState={formState} min={0} max={3000} step={100} unit={'m'} />
            <SliderWithInputGrid formState={formState} valueName={'hoydeforskjell'} label={'Høydeforskjell i meter'} min={-100} max={200} step={1} unit={'m'} />
            <LabelledDiv className={'radioGroup'} label={'Slange'} id={'diameter'}>
              <select {...select('diameter')} id={'diameter'}>
                <option value={'2.5'}>2½"</option>
                <option value={'4'}>4"</option>
              </select>
            </LabelledDiv>
          </section>
          <h1>Resultat</h1>
          <section className={styles.horizontal}>
            <LabelledOutput label={'Strømmingstap'}>
              <ValueWithUnit value={strommingstap} unit={'bar'} stringifier={(n) => n} />
            </LabelledOutput>
            <LabelledOutput label={'Høydetap'}>
              <span className={styles.radiolabel}>{hoydeTap} bar</span>
            </LabelledOutput>
          </section>
          <section className={styles.horizontal}>
            {/*<label>
              Pumpekapasitet<br/>
              <select {...select('pumpetype')}>
                <option value={"10 bar"}>10 bar (Ziegler)</option>
                <option value={"6 bar"}>6 bar (Otter)</option>
              </select>
            </label>*/}
            <LabelledOutput label={'Nødvendig utgangstrykk'}>
              <ValueWithUnit value={utgangstrykk} unit={'bar'} stringifier={(n) => n.toFixed(2)} />
            </LabelledOutput>
            <LabelledOutput label={'Antall slanger'}>
              <span className={styles.radiolabel}>{antallSlanger}</span>
            </LabelledOutput>
          </section>
        </article>
      </main>
    </div>
  )
}

export default App
