import styles from "./boutonFilter.module.scss";


function boutonFilter ({ onFilterChange }) {

    let plateforme = [{value: 'all', text: 'Toutes les plateformes'}, 
    {value: 'NES', text: 'NES'},
    {value: 'SNES', text: 'SNES'},
    {value: 'GB', text: 'Gameboy'},
    {value: 'N64', text: 'Nintendo 64'},
    {value: 'PS1', text: 'Playstation'}, 
  ];


    return (
        <>
        <select className={styles.FiltreConsole} onChange={(e) => onFilterChange(e.target.value)}>
        {
          plateforme.map(({value, text}, index) => (
            <option key={index} value={value}>{text || value}</option>
          ))
        }
      </select>
        </>
    )
}

export default boutonFilter