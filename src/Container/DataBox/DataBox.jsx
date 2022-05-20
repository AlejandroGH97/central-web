import { useEffect, useState } from "react";
import Star from "../../Assets/Icons/Star";
import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
} from "react-vis";
import httpClient from "../../lib/httpClient";

import "react-vis/dist/style.css";
import styles from "./DataBox.module.css";

const DataBox = (props) => {
  const MESES = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Setiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const [yearFilter, setYearFilter] = useState();
  const [causeData, setCauseData] = useState([]);
  const [filteredCauseData, setFilteredCauseData] = useState([]);
  const [yearsList, setYearsList] = useState([]);

  useEffect(() => {
    getSelectedCauseData();
  }, [props.cause.name]);

  useEffect(() => {
    filterCauseData();
  }, [causeData, yearFilter]);

  // Función que pide los datos de la causa seleccionada
  const getSelectedCauseData = async () => {
    // Si hay una causa valida seleccionada traemos la informacion
    if (props.cause.hasOwnProperty("id")) {
      try {
        // Pedimos la lista de causas a la ruta /causas/:id
        const data = await httpClient.get(`/causas/${props.cause.id}`);
        // Ordenamos los datos por fecha si se
        data.sort((data1, data2) => {
          if (Date.parse(data1.date) < Date.parse(data2.date)) return -1;
          if (Date.parse(data1.date) > Date.parse(data2.date)) return 1;
          return 0;
        });

        setCauseData(data);

        const years = [];
        for (let index = 0; index < data.length; index++) {
          if (
            years.findIndex((year) => year === parseInt(data[index].date)) ===
            -1
          ) {
            years.push(parseInt(data[index].date));
          }
        }
        setYearsList(years);
        setYearFilter(years[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filterCauseData = () => {
    let filteredData = causeData
      .filter((cause) => {
        return parseInt(cause.date) === parseInt(yearFilter);
      })
      .map((cause) => {
        return {
          x: new Date(cause.date).getUTCMonth() + 1,
          y: cause.count,
        };
      });
    setFilteredCauseData(filteredData);
  };

  const handleYearFilterChange = (event) => {
    setYearFilter(event.target.value);
  };

  return (
    <div className={styles.dataBox}>
      <div className={styles.dataTitle}>
        {props.cause.name}{" "}
        {props.cause.isFavorite && (
          <Star height={30} width={30} class={styles.star} />
        )}
      </div>
      <select
        value={yearFilter}
        onChange={handleYearFilterChange}
        className={styles.yearSelect}
      >
        {yearsList.map((year) => {
          return (
            <option value={year} key={year}>
              {year}
            </option>
          );
        })}
      </select>
      <FlexibleXYPlot
        margin={{ left: 70, right: 30 }}
        animation={true}
        style={{
          borderRadius: "10px",
          border: "2px solid #0000ff",
          boxShadow: "4px 4px 10px #000000bb",
          padding: "10px"
        }}
      >
        <VerticalGridLines style={{stroke: "#989898"}}/>
        <HorizontalGridLines style={{stroke: "#989898"}}/>
        <XAxis
          type={"ordinal"}
          tickTotal={12}
          style={{
            ticks: {
              fontSize: "14px",
              color: "#000000",
            },
          }}
          tickFormat={(tick) => {
            return MESES[tick - 1].slice(0, 3);
          }}
        />
        <YAxis
          style={{
            ticks: {
              fontSize: "14px",
              color: "#000000",
            },
          }}
        />
        <LineSeries
          data={filteredCauseData}
          curve={"curveMonotoneX"}
          strokeWidth={3}
          stroke={"#0000ff"}
        />
      </FlexibleXYPlot>
      
    </div>
  );
};

export default DataBox;
