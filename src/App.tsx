import React from 'react'
// import './App.scss'
import styles from './App.module.scss'; // Import css modules stylesheet as styles
import './range-input-style.css';
import './select-style.css';
import { useFormState } from 'react-use-form-state';

const strommingstapPr100mTabell = [
  [250, 0.25, undefined],
  [500, 1, 0.1],
  [1000, 4, 0.5],
  [1500, undefined, 1],
  [2000, undefined, 2]
];

const slangelengde = 25;
// const vannveggForbruk = 800;

console.log('App.tsx', 'Global');

const App = () => {
  console.log('App.tsx', 'App');
  const [formState, { select, range }] = useFormState({
    destinasjonTrykk: 1,
    avstand: 1,
    hoydeforskjell: 0,
    diameter: "4",
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
    strommingstap = strommingstapPr100m * parseFloat(formState.values.avstand) / 100;
  }

  const antallSlanger = Math.ceil(formState.values.avstand / slangelengde);

  const hoydeTap = formState.values.hoydeforskjell / 10;

  const utgangstrykk = parseFloat(formState.values.destinasjonTrykk) + strommingstap + hoydeTap;

  return (
    <div className={styles.app}>
      <main>
        <article>
          <h1>Destinasjon</h1>
          <section className={styles.horizontal}>
            <label>
              Ønsket vannmengde<br/>
              <span className={styles.smallText}>Vannvegg: 800 l/min, strålerør: 500 l/min</span>
              <select {...select('vannmengde')}>
                <option value={250}>250 l/min</option>
                <option value={500}>500 l/min</option>
                <option value={1000}>1000 l/min</option>
                <option value={1500}>1500 l/min</option>
                <option value={2000}>2000 l/min</option>
              </select>
            </label>
            <label>
              Ønsket trykk<br/>
              <input {...range('destinasjonTrykk')} max={10} min={1}/>
              {formState.values.destinasjonTrykk} bar
            </label>
          </section>
          <h1>Utlegg</h1>
          <section className={styles.horizontal}>
            <label>
              Avstand i m<br/>
              <input {...range('avstand')} min={0} max={1000} step={100}/>
              {formState.values.avstand} m
            </label>
            <label>
              Høydeforskjell i meter<br/>
              <input {...range('hoydeforskjell')} min={-100} max={200} step={1}/>
              {formState.values.hoydeforskjell} m
            </label>
            <div className={"radioGroup"}>
              Slange<br/>
              <select {...select('diameter')}>
                <option value={"2.5"}>2½"</option>
                <option value={"4"}>4"</option>
              </select>
            </div>
          </section>
          <h1>Resultat</h1>
          <section className={styles.horizontal}>
            <label>
              Strømmingstap:<br/>
              <span className={styles.radiolabel}>{strommingstap} bar</span>
            </label>
            <label>
              Høydetap:<br/>
              <span className={styles.radiolabel}>{hoydeTap} bar</span>
            </label>
          </section>
          <section className={styles.horizontal}>
            {/*<label>
              Pumpekapasitet<br/>
              <select {...select('pumpetype')}>
                <option value={"10 bar"}>10 bar (Ziegler)</option>
                <option value={"6 bar"}>6 bar (Otter)</option>
              </select>
            </label>*/}
            <label>
              Nødvendig utgangstrykk<br/>
              <span className={styles.radiolabel}>{utgangstrykk.toFixed(1)} bar</span>
            </label>
            <label>
              Antall slanger:<br/>
              <span className={styles.radiolabel}>{antallSlanger}</span>
            </label>
          </section>
        </article>

      </main>
    </div>
  );
};

export default App
