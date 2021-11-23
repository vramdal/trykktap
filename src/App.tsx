import React from 'react'
// import './App.scss'
import styles from './App.module.scss'; // Import css modules stylesheet as styles
import { useFormState } from 'react-use-form-state';

const strommingstapPr100mTabell = [
  [250, 0.25, undefined],
  [500, 1, 0.1],
  [1000, 4, 0.5],
  [1500, undefined, 1],
  [2000, undefined, 2]
];

const slangelengde = 25;
const vannveggForbruk = 800;



const App = () => {
  const [formState, { radio, number, select }] = useFormState({
    destinasjonTrykk: 1,
    avstand: 1,
    hoydeforskjell: 0,
    diameter: "2.5",
    vannmengde: "250",
    pumpetype: "10 bar"

  });
  let strommingstapPr100m : number | undefined = undefined;
  const strommingstapRow = strommingstapPr100mTabell.find(row => (row[0] + "") === formState.values.vannmengde);

  if (strommingstapRow) {
    if (formState.values.diameter === "2.5") {
      strommingstapPr100m = strommingstapRow[1];
    } else  {
      strommingstapPr100m = strommingstapRow[2];
    }
  }

  let strommingstap;
  if (strommingstapPr100m) {
    strommingstap = strommingstapPr100m * parseFloat(formState.values.avstand) * 10;
  }

  const antallSlanger = Math.ceil(formState.values.avstand * 1000 / slangelengde);

  const hoydeTap = formState.values.hoydeforskjell / 10;

  const utgangstrykk = parseFloat(formState.values.destinasjonTrykk) + strommingstap + hoydeTap;

  return (
    <div className={styles.app}>
      <main>
        <section className={styles.horizontal}>
          <label>
            Ønsket vannmengde<br/>
            <select {...select('vannmengde')}>
              <option value={250}>250 l/min</option>
              <option value={500}>500 l/min</option>
              <option value={1000}>1000 l/min</option>
              <option value={1500}>1500 l/min</option>
              <option value={2000}>2000 l/min</option>
            </select>
          </label>
          <label>
            Ønsket trykk ved destinasjon<br/>
            <input {...number('destinasjonTrykk')}/>
          </label>
        </section>
        <article>
          <section className={styles.horizontal}>
            <label>
              Avstand i km<br/>
              <input {...number('avstand')}/>
            </label>
            <label>
              Høydeforskjell i meter<br/>
              <input {...number('hoydeforskjell')}/>
            </label>
            <label>
              Slangediameter<br/>
              <input {...radio('diameter', "2.5")}/>2½"<br/>
              <input {...radio('diameter', "4")}/>4"
            </label>
          </section>
          <section className={styles.horizontal}>
            <label>
              Strømmingstap:<br/>
              {strommingstap} bar
            </label>
            <label>
              Høydetap:<br/>
              {hoydeTap} bar
            </label>
          </section>
          <section className={styles.horizontal}>
            <label>
              Pumpetype<br/>
              <select {...select('pumpetype')}>
                <option value={"10 bar"}>Maks 10 bar (Ziegler)</option>
                <option value={"6 bar"}>Maks 6 bar (Otter)</option>
              </select>
            </label>
            <label>
              Nødvendig utgangstrykk<br/>
              {utgangstrykk}
            </label>
            <label>
              Antall slanger:<br/>
              {antallSlanger}
            </label>
          </section>
        </article>

      </main>
    </div>
  );
};

export default App
