import React from "react";
import { TypeCamaras, TypeSensor, TypeValor } from "../../pages/camaras/interface/camara.interface";
import { valores } from "../../api/valores";
import moment from "moment";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Box, Button, CircularProgress, Grid, Stack } from "@mui/material";
import 'chartjs-adapter-moment';
import zoomPlugin from 'chartjs-plugin-zoom';
import CrosshairPlugin from 'chartjs-plugin-crosshair';
import { frioApi, useGetValoresByCamaraIdQuery, useLazyGetValoresByCamaraIdQuery } from "../../api/frioApi";

type CardProps = {
    propsCamara: TypeCamaras;
}


export const GraficoComponent: React.FC<CardProps> = ({propsCamara}) => {

  const chartRef = React.useRef<ChartJS<"line", TypeValor[], string>>(null);

  // Estado para los márgenes de fechas actuales
  const [starDateDb, setStartDateDb] = React.useState(moment().subtract(2,'day').toDate());   
  const [endDateDb, setEndDateDb] = React.useState(moment().toDate());   
  const [startChart, setStartChart] = React.useState(moment().subtract(1,'day').toDate());   

  // Hook de RTK Query para obtener datos bajo demanda
  const [fetchChartData, { data, error, isLoading }] = useLazyGetValoresByCamaraIdQuery();

// Datos iniciales para el gráfico
const [chartData, setChartData] = React.useState({
  datasets: 
    data?.data.map((sensor: TypeSensor) => ({
        label: sensor.name_front,
        data: sensor.valores,
        parsing: {
          xAxisKey: 'fecha_hora_value',
          yAxisKey: 'value'
        },
        fill: false,
        backgroundColor: sensor.color_front,
        borderColor: sensor.color_front,  
      }) 
  ) || []
});

// Ejecutar la primera carga de datos cuando se monta el componente
React.useEffect(() => {
  fetchChartData({ 
    camaraId: propsCamara.id, 
    fechaInicio: starDateDb.toString(), // moment().subtract(2,'day').toDate().toString(), 
    fechaFin: endDateDb.toString()});
}, [fetchChartData, propsCamara.id, starDateDb, endDateDb]);

  // Efecto para manejar la actualización de datos en background
  React.useEffect(() => {
    if (data) {
      setChartData({
        datasets: 
        data?.data.map((sensor: TypeSensor) => ({
            label: sensor.name_front,
            data: sensor.valores,
            parsing: {
              xAxisKey: 'fecha_hora_value',
              yAxisKey: 'value'
            },
            fill: false,
            backgroundColor: sensor.color_front,
            borderColor: sensor.color_front,  
          })
      )});
    }
  }, [data]);




   //useLazyGetValoresByCamaraIdQuery

   if (error) {
    return (
      <section className="alert alert-danger">
        Falla de conexion con el servidor {/**error.data.message*/}
      </section>
    );
  }

  /*if (data.lengtn === 0 || isLoading) {
    return(
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }
*/



 /* const [allValor, setValor] = React.useState<TypeSensor[] | null>([]);

  const [loading, setLoading] = React.useState<boolean>(true);

  console.log("Data desde grafico", data?.data);

  console.log("Allvalor desde grafico", allValor);



  React.useEffect(() => {
      setLoading(true); 
      valores
      .getbyCamaraId(propsCamara.id, moment().subtract(2,'day').toDate(),moment().toDate())
      .then((r) => {
          setValor(r.data.data);
          //console.log(r.data.data);
          setTimeout(() => setLoading(false), 300); //Una vez que la data cargo a loa 300ms se renderizan el grafico 
        })
        .catch((err) => {
          console.error(err);
        });

  }, [propsCamara.id]);
*/

  // Función que se llama al hacer pan/zoom
  const handleZoomPan = () => {
    const chartInstance = chartRef.current;
    if (chartInstance) {
      const newStartDate = moment(chartInstance.scales.x.min).toDate();
      const newEndDate = moment(chartInstance.scales.x.max).toDate();

      // Si se ha hecho pan más allá de los límites actuales, cargar más datos
      if (newStartDate < starDateDb || newEndDate > endDateDb) {
        console.log("Hola desde handlezoompan, se actualizan datos")
        fetchChartData({ 
          camaraId: propsCamara.id, 
          fechaInicio: newStartDate.toString(), // moment().subtract(2,'day').toDate().toString(), 
          fechaFin: newEndDate.toString()});
        setStartDateDb(newStartDate);
        setEndDateDb(newEndDate);
      }

      // Actualizar la escala del eje x con los nuevos valores
      chartInstance.options.scales!.x!.min = chartInstance.scales.x.min;
      chartInstance.options.scales!.x!.max = chartInstance.scales.x.max;

      // Forzar la actualización del gráfico
      chartInstance.update('none');
    }
  };



  async function fetchData(x1: Date, x2: Date) : Promise<TypeSensor[] | null> {

    try {;
      
      const r = await valores.getbyCamaraId(propsCamara.id, x1, x2);
    /*  const r = await trigger({
        camaraId: propsCamara.id, 
        fechaInicio: x1.toString(), // moment().subtract(2,'day').toDate().toString(), 
        fechaFin: x2.toString()}).unwrap();*/
      
      

      return r.data.data;
      
    } catch (error) {
      return [];
      
    }
  }




  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    zoomPlugin,
    
  );
 
  let timer: any;
  function startFetch( chart: any) {

    console.log("Hola desde startFech");
 
    const min = moment(chart.chart.scales.x.min).toDate();
    const max = moment(chart.chart.scales.x.max).toDate();

    //setStartChart(min);
    //setEndChart(max);

    console.log("StartdB antes= ",starDateDb);
    console.log("StartChart antes= ",min);
    console.log("EndChart antes= ",max);

    console.log(data);
    var startdB = min;

    setStartDateDb(min);
    setEndDateDb(max)
    //refetch();

    /*if(min < starDateDb)
    {
//      clearTimeout(timer);
//      timer = setTimeout(() => {
          



          while (min < startdB) 
            startdB = moment(startdB).subtract(2,'day').toDate();
          
       //   setStartChart(min);
     //     setEndChart(max);

          startChart = min;
          endChart = max;

          //chart.chart.scales.x.min = min.toString();
          //chart.chart.scales.x.max = max.toString();


          setStartDateDb(startdB);
          refetch();
         // setStartChart(min);
         // setEndChart(max);

          console.log("StartdB despues= ",starDateDb);
          console.log("StartChart despues= ",startChart);
          console.log("EndChart despues= ",endChart);

          //chart.chart.stop(); // make sure animations are not running
        //  chart.chart.update('none');


         /* trigger({
            camaraId: propsCamara.id, 
            fechaInicio: startDb.toString(), // moment().subtract(2,'day').toDate().toString(), 
            fechaFin: end.toString()},)*/
        
         /* refetch().then(() =>{
            console.log("Hola desde refecth");
            console.log("Data")
            chart.chart.data.datasets =  
              data!.data.map((sensor: TypeSensor) => ({
                label: sensor.name_front,
                data: sensor.valores,
                parsing: {
                  xAxisKey: 'fecha_hora_value',
                  yAxisKey: 'value'
                },
                fill: false,
                backgroundColor: sensor.color_front,
                borderColor: sensor.color_front,  
              })
            )

            //console.log("chart desde start fetch ", r);
            
            chart.chart.stop(); // make sure animations are not running
            chart.chart.update('none');
            //console.log("min" + min)
            //console.log("startDB" + startDb)
          });
 //     }, 200);
    }*/
  }

 /* var dataValores = {
    datasets: []
  };*/

 /* if(!isLoading && isSuccess) {
    console.log("Success");
    dataValores = {
      datasets: 
        data!.data.map((sensor: TypeSensor) => ({
            label: sensor.name_front,
            data: sensor.valores,
            parsing: {
              xAxisKey: 'fecha_hora_value',
              yAxisKey: 'value'
            },
            fill: false,
            backgroundColor: sensor.color_front,
            borderColor: sensor.color_front,  
          })
       )
    };
  }*/

 /* if(!isLoading && isSuccess) {

    chartRef.current!.stop();
    chartRef.current!.update('none');
  }*/
  
  /*const dataValores = { 
    datasets: 
      data?.data.map((sensor: TypeSensor) => ({
          label: sensor.name_front,
          data: sensor.valores,
          parsing: {
            xAxisKey: 'fecha_hora_value',
            yAxisKey: 'value'
          },
          fill: false,
          backgroundColor: sensor.color_front,
          borderColor: sensor.color_front,  
        })
     )
  };*/



  const scales = {
    x: {
     // position: 'bottom' as const,
      //min: startChart.toString(),
      //max: endChart.toString(),
      type: 'time' as const,
     // distribution: "series" as const,
      ticks: {
        autoSkip: true,
        autoSkipPadding: 50,
        maxRotation: 0
      },
      time: {
        units: "hour",
        displayFormats: {
          hour: "DD/MM/YYYY HH:mm",
          minute: 'DD/MM/YYYY HH:mm',
        },
        tooltipFormat: "DD/MM/YYYY HH:mm",
      },
      grid: {
        color: 'rgba(49, 48, 48, 0.3)',
      },
    },
    y: {
      suggestedMin: -10.0, // -1.0,
      suggestedMax: 20.0, //2.0,
      title:{
        text: "Temperatura [°C]" as const,
        display: true,
        font: {
          size: 16
        }
      },
      type: 'linear' as const,
      position: 'left' as const,
      grid: {
        color: 'rgba(49, 48, 48, 0.3)',
      },
    },
  };

  const zoomOptions = {
/*    limits: {
      x: {
        min: 'original' as const,
        max: 'original' as const, 
        minRange: 60 * 1000},
      },*/
    pan: {
      enabled: true,
      mode: 'x' as const,
      modifierKey: 'ctrl' as const,
      onPanComplete: handleZoomPan
    },
    zoom: {
      wheel: {
        enabled: false,
      },
      drag: {
        enabled: true,
      },
      pinch: {
        enabled: true
      },
      mode: 'x' as const,
      onZoomComplete: handleZoomPan
    },
  };



  const tituloOptions = {
    display: true,
    position: 'top' as const,
    text: `Grafico Historico ${propsCamara.name}`,
    font: {
      size: 24
    }
  }

  const pointOptions = {
      radius: 1,
  }

  const options = {
    scales: scales,
    plugins: {
      zoom: zoomOptions,
      title: tituloOptions,    
    },
    transitions: {
      zoom: {
        animation: {
          duration: 100
        }
      }
    },
    elements: {
      point: pointOptions,
    },
  }
  
  const resetZoom = () => {
    chartRef.current!.resetZoom();
  }
  const PanAtras = () => {
    chartRef.current!.pan({x: 100}, undefined, 'default');
  }         
  const PanAdelante = () => {
    chartRef.current!.pan({x: -100}, undefined, 'default');
  } 
  


    return (
        <>
            {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) :
                <>   
                    <Line ref={chartRef} options={options} data={chartData} />
                    <Stack sx={{my: 2}} spacing={2} direction="row">
                      <Button variant="outlined" onClick={resetZoom}>Reset Zoom</Button>
                      <Button variant="outlined" onClick={PanAtras}>Mover Atras</Button>
                      <Button variant="outlined" onClick={PanAdelante}>Mover Adelante</Button>
                    </Stack>
                </>
            }
        </>
    )
}