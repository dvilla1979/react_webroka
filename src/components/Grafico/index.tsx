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


type CardProps = {
    propsCamara: TypeCamaras;
}


export const GraficoComponent: React.FC<CardProps> = ({propsCamara}) => {

  const chartRef = React.useRef<ChartJS<"line", TypeValor[], string>>(null);

  const [allValor, setValor] = React.useState<TypeSensor[] | null>([]);

  const [loading, setLoading] = React.useState<boolean>(true);

 
  var startDb:Date =  moment().subtract(2,'hour').toDate();
  var startChart:Date =  moment().subtract(1,'hour').toDate();
  var end:Date =  moment().toDate();

 
  const CustomCrosshairPlugin = function (plugin: any) {  
    const originalAfterDraw = plugin.afterDraw;  
    plugin.afterDraw = function(chart: any, easing: any) {  
        if (chart && chart.crosshair) {  
          originalAfterDraw.call(this, chart, easing);  
        }  
    };  
    return plugin;  
  };


  React.useEffect(() => {
      setLoading(true); 
      valores
      .getbyCamaraId(propsCamara.id, moment().subtract(2,'hour').toDate(), moment().toDate())
      .then((r) => {
          setValor(r.data.data);
          console.log(r.data.data);
          setTimeout(() => setLoading(false), 50); //Una vez que la data cargo a loa 300ms se renderizan el grafico 
        })
        .catch((err) => {
          console.error(err);
        });

  }, [propsCamara.id]);

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
    CustomCrosshairPlugin(CrosshairPlugin),
  );

  async function fetchData(x1: Date, x2: Date) : Promise<TypeSensor[] | null> {

    try {;
      
      const r = await valores.getbyCamaraId(propsCamara.id, x1, x2);

      return r.data.data;
      
    } catch (error) {
      return [];
      
    }
  }
 
  let timer: any;
  function startFetch( chart: any) {

    const min = moment(chart.chart.scales.x.min).toDate();
    const max = moment(chart.chart.scales.x.max).toDate();

    var start = startDb;
   // console.log("min" + min)
   // console.log("startDB " + startDb)

   // console.log(chartRef);

    if(min < start)
    {
      clearTimeout(timer);
      timer = setTimeout(() => {
          
        while (min < start) 
            start = moment(start).subtract(2,'hour').toDate();

        startDb = start;

        fetchData(start, end).then((r) =>{
        chartRef.current!.data.datasets = r!.map((sensor: TypeSensor) => ({
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
        })

        chart.chart.stop(); // make sure animations are not running
        chart.chart.update('none');

      }, 50);
    }
  }

  const dataValores = { 
    datasets: 
        allValor!.map((sensor) => ({
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



  const scales = {
    x: {
     // position: 'bottom' as const,
      min: startChart.toString(),
      max: end.toString(),
      type: 'time' as const,
     // distribution: "series" as const,
      ticks: {
        autoSkip: true,
        autoSkipPadding: 50,
        maxRotation: 0,
        color: 'rgb(0,0,0)' 
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
        color: 'rgba(49, 48, 48, 0.5)',
          display: true,
          drawBorder: true, // Dibuja el borde del eje X
          //color: 'rgba(0, 0, 0, 0.1)', // Color de la cuadrícula
          borderColor: 'black', // Color del borde
      },
    },
    y: {
      suggestedMin: -5.0, // -1.0,
      suggestedMax: 5.0, //2.0,
      ticks: { color: 'rgb(0,0,0)'},
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
        color: 'rgba(49, 48, 48, 0.5)',
       display: true,
       drawBorder: true, // Dibuja el borde del eje X
       //color: 'rgba(0, 0, 0, 0.1)', // Color de la cuadrícula
       borderColor: 'black', // Color del borde
      },
    },
  };

  const zoomOptions = {
    limits: {
      x: {
        min: 'original' as const,
        max: 'original' as const, 
        minRange: 60 * 1000},
      },
    pan: {
      enabled: true,
      mode: 'x' as const,
      modifierKey: 'ctrl' as const,
      onPan: startFetch
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
      onZoomComplete: startFetch
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
      radius: 2,
  }
  const crosshairOptions = {
    line: {
      color: '#F66',  // crosshair line color
      width: 1        // crosshair line width
    },
  }

  const options = {
    scales: scales,
    plugins: {
      zoom: zoomOptions,
      title: tituloOptions,
      crosshair: crosshairOptions,   
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
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : <>
                    <div 
                      style={{ 
                        width: '100%', 
                        margin: '0 auto', 
                        border: '1px solid black', 
                        padding: '10px' }}>
                      <Line ref={chartRef} options={options} data={dataValores} />
                      </div>
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
/*
<Stack sx={{my: 2}} spacing={2} direction="row">
<Button variant="outlined" onClick={resetZoom}>Reset Zoom</Button>
<Button variant="outlined" onClick={PanAtras}>Mover Atras</Button>
<Button variant="outlined" onClick={PanAdelante}>Mover Adelante</Button>
</Stack>*/