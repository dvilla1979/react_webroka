import React from "react";
import { TypeCamaras, TypeSensor } from "../../pages/camaras/interface/camara.interface";
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
import { Box, CircularProgress } from "@mui/material";
import 'chartjs-adapter-moment';
import zoomPlugin from 'chartjs-plugin-zoom';
import CrosshairPlugin from 'chartjs-plugin-crosshair';

type CardProps = {
    propsCamara: TypeCamaras;
}


export const GraficoComponent: React.FC<CardProps> = ({propsCamara}) => {

    const [allValor, setValor] = React.useState<TypeSensor[] | null>([]);

    const [loading, setLoading] = React.useState<boolean>(true);


    React.useEffect(() => {
        setLoading(true); 
        valores
        .getbyCamaraId(propsCamara.id, moment().subtract(3,'day').toDate(),moment().toDate())
        .then((r) => {
            setValor(r.data.data);
            setTimeout(() => setLoading(false), 300); //Una vez que la data cargo a loa 300ms se renderizan el grafico 
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
        CrosshairPlugin
      );

    const data = {

        datasets: allValor!.map((sensor) => ({
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

    const options =  {
          responsive: true,
          stacked: false,

          plugins: {
            title: {
              display: true,
              text: 'Hisotrico de Sensores de Temperatura'
            },

            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true
                },
                mode: 'xy' as const,
              }
            },

           /* crosshair: {
                line: {
                  color: "back",
                  width: 2,
                },
                sync: {
                  enabled: true,
                  group: 1,
                  suppressTooltips: false,
                },
                zoom: {
                  enabled: false,
                },
              }*/
            
           /* tooltip: {
              enabled: true,
              interaction:   {
                mode: 'interpolate' as const
              },
              intersect: false
            },*/


            crosshair: {
              line: {
                color: '#F66',  // crosshair line color
                width: 1        // crosshair line width
              },
              sync: {
                enabled: true,            // enable trace line syncing with other charts
                group: 1,                 // chart group
                suppressTooltips: false   // suppress tooltips when showing a synced tracer
              },
              zoom: {
                enabled: true,                                      // enable zooming
                zoomboxBackgroundColor: 'rgba(66,133,244,0.2)',     // background color of zoom box 
                zoomboxBorderColor: '#48F',                         // border color of zoom box
                zoomButtonText: 'Reset Zoom' as const,                       // reset zoom button text
                zoomButtonClass: 'reset-zoom' as const,                      // reset zoom button class
              },
               callbacks: {
                beforeZoom: () => function(start: any, end: any) {   
                  console.log("Before Start = ", start);
                  console.log("Before end",end);               // called before zoom, return false to prevent zoom
                  return true;
                },
                afterZoom: () => function(start: any, end: any) {                   // called after zoom
                  console.log("After Start = ", start);
                  console.log("After end",end);               // called before zoom, return false to prevent zoom
                }
              }
            }    



          },
          scales:{ 
            y: {
              min: -10.0,
              max: 20.0,
              title:{
                text: "Temperatura [°C]" as const,
                display: true,
              },
              grid: {
                color: 'rgba(49, 48, 48, 0.3)',
              },
            },
            x: {
              type:"time" as const,
              distribution: "series" as const,
              min: moment().subtract(1,'day').toString(),
              max: moment().toString(),
              time: {
               // unit: 'hour' as const,
                displayFormats: {
                    hour: "DD/MM/YYYY HH:mm"
                    // or any desired format
                },
                tooltipFormat: "DD/MM/YYYY HH:mm",
              },
              grid: {
                color: 'rgba(49, 48, 48, 0.3)',
              },
              
            }

          },
          
          

          
          /*scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
      
              // grid line settings
              grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
            },
          }*/
        };

    /*const options = {
        responsive: true,
        plugins: {
            title: {
            display: true,
            text: 'Hisotrico de Sensores de Temperatura',
            },
        },
        };*/


  
    return (
        <>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) :
                <>
                    <Line options={options} data={data} />
                </>
            }
        </>
    )
}