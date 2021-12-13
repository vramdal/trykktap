import React from 'react'
import { FormState } from 'react-use-form-state'
import { Grid, Input, InputAdornment, Slider } from '@material-ui/core'
import styles from './App.module.scss'
import { FormStateType, ReactNodeWrapper } from './Types'


type SliderWithInputProps = {
  formState: FormState<FormStateType>
  valueName: keyof FormStateType
  unit?: string
  sliderWrapper?: ReactNodeWrapper
  inputWrapper?: ReactNodeWrapper
  max: number
  min: number
  step?: number
}
export const SliderWithInput = (props: SliderWithInputProps) => {
  const sliderWrapper = props.sliderWrapper || ((el) => el)
  const inputWrapper = props.inputWrapper || ((el) => el)
  if (typeof props.formState.values[props.valueName] !== 'number') {
    throw new Error(`Verdien for ${props.valueName} er ikke et tall: ${props.formState.values[props.valueName]}`)
  }
  const value: number = props.formState.values[props.valueName] as unknown as number
  const ariaValueText = (txtValue) => `${txtValue}${(props.unit && ` ${props.unit}`) || ''}`

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
            props.formState.setField(props.valueName, newValue as number)
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

export function SliderWithInputGrid(props: { formState: FormState<FormStateType>; valueName: keyof FormStateType; label: string; min: number; max: number; step: number; unit: string }) {
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
          <Grid container item xs={8} alignItems="center">
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

SliderWithInput.defaultProps = {
  sliderWrapper: (el) => el,
  inputWrapper: (el) => el,
  unit: undefined,
  step: undefined,
}
