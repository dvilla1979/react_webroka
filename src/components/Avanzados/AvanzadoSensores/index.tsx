import React, { useState } from 'react';
import { 
  DataGrid, 
  GridColDef, 
  GridActionsCellItem 
} from '@mui/x-data-grid';
import { 
  Box, 
  Button, 
  CircularProgress, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  Stack, 
  TextField, 
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { 
  useActualizarSensorMutation,
  useAgregarSensorMutation, 
  useBorrarSensorMutation, 
  useGetSensoresByCamaraIdQuery,  
} from '../../../api/frioApi';
import { ItemCamara, ItemFrigorifico, ItemSensor, SensorColor, SensorDato, SensorType } from '../interfaces/avanzado.interface';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useNavigate } from 'react-router-dom';

type CardProps = {
    propsCamara: ItemCamara;
    propsFrio: ItemFrigorifico;
}

export const AvanzadoSensorComponent: React.FC<CardProps> = ({propsFrio, propsCamara}) => {
  
  const navigate = useNavigate();

  const { data = [], isLoading, refetch } = useGetSensoresByCamaraIdQuery(propsCamara.id);
  const [addItem] = useAgregarSensorMutation();
  const [updateItem] = useActualizarSensorMutation();
  const [deleteItem] = useBorrarSensorMutation();
  
  const [editItem, setEditItem] = useState<ItemSensor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddClick = () => {
    setEditItem(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (item: ItemSensor) => {
    setEditItem(item);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    await deleteItem(id);
    refetch();
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditItem(null);
  };

  const handleSaveClick = async (frioId: string, camaraId: string) => {
    if (editItem) {
      if (editItem.id) {
        await updateItem(
          {
            id: editItem.id, 
            name_db: editItem.name_db,
            name_front: editItem.name_front,
            descripcion: editItem.descripcion,
            tipo_dato: editItem.tipo_dato,
            tipo_sensor: editItem.tipo_sensor,
            color_front: editItem.color_front,
            frigorifico: frioId,
            camara: camaraId
          }
        );
      } else {
        await addItem(
          {
            name_db: editItem.name_db,
            name_front: editItem.name_front,
            descripcion: editItem.descripcion,
            tipo_dato: editItem.tipo_dato,
            tipo_sensor: editItem.tipo_sensor,
            color_front: editItem.color_front,
            frigorifico: frioId,
            camara: camaraId
          }
        );
      }
      refetch();
      handleDialogClose();
    }
  }; 

  const handleViewFriosClick = () => {
    navigate("/avanzado");
  };

  const handleViewCamarasClick = (frio: ItemFrigorifico) => {  
    navigate("/avanzado/camaras",{state: {frio}});
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name_db', headerName: 'Nombre Db', width: 250, editable: false },
    { field: 'name_front', headerName: 'Nombre Front', width: 250, editable: false },
    { field: 'tipo_dato', headerName: 'Tipo Dato', width: 150, editable: false },
    { field: 'tipo_sensor', headerName: 'Tipo Sensor', width: 150, editable: false },
    { field: 'color_front', headerName: 'Color', width: 150, editable: false },
    {
        field: 'camara',
        headerName: 'camara',
        width: 150,
        // Accediendo al valor anidado dentro de `item`
        valueGetter: (params, row) => row.camara?.name ?? 'N/A',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          color="primary"
          onClick={() => handleEditClick(params.row)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          color="error"
          onClick={() => handleDeleteClick(params.row.id as string)}
        />,
      ],
    },
    { field: 'descripcion', headerName: 'Descripcion', width: 150, editable: false },
  ];


  return (
    <div>
    {isLoading ? (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    ) :
      <Box sx={{ height: 400, width: '100%', padding: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
          Lista de sensores de la {`${propsCamara?.name}`} del frigorifico  {`${propsFrio?.name}`}
        </Typography>
          <Stack sx={{my: 2}} spacing={2} direction="row">
          <Button
            variant="contained"
            color="primary"
            startIcon={<KeyboardDoubleArrowLeftIcon />}  
            onClick={() => handleViewFriosClick()}
          >
            FRIGORIFICOS
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<NavigateBeforeIcon />}  
            onClick={() => handleViewCamarasClick(propsFrio)}
          >
            CAMARAS
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
          >
            AGREGAR SENSOR
          </Button>
        </Stack>
        <DataGrid
          rows={data!.data}
          columns={columns}
          editMode="row"
          onRowEditStop={() => {}}
        />
        
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>{editItem ? 'Editar Sensor' : 'Agregar Sensor'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre db"
              fullWidth
              variant="standard"
              value={editItem?.name_db || ''}
              onChange={(e) => setEditItem({ ...editItem, name_db: e.target.value } as ItemSensor)}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Nombre Front"
              fullWidth
              variant="standard"
              value={editItem?.name_front || ''}
              onChange={(e) => setEditItem({ ...editItem, name_front: e.target.value } as ItemSensor)}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Descripcion"
              fullWidth
              variant="standard"
              value={editItem?.descripcion || ''}
              onChange={(e) => setEditItem({ ...editItem, descripcion: e.target.value } as ItemSensor)}
            />
            <FormControl variant="standard" fullWidth >
              <InputLabel>Tipo de Dato</InputLabel>
                <Select
                  value={editItem?.tipo_dato || ''}
                  onChange={(e) => setEditItem({ ...editItem, tipo_dato: e.target.value } as ItemSensor)}
                  fullWidth
                  label="Tipo de Dato"
                  
                >
                  {Object.values(SensorDato).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>
            <FormControl variant="standard" fullWidth >
              <InputLabel>Tipo de Sensor</InputLabel>
                <Select
                  value={editItem?.tipo_sensor || ''}
                  onChange={(e) => setEditItem({ ...editItem, tipo_sensor: e.target.value } as ItemSensor)}
                  fullWidth
                  label="Tipo de Dato"
                  
                >
                  {Object.values(SensorType).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>
            <FormControl variant="standard" fullWidth >
              <InputLabel>Color</InputLabel>
                <Select
                  value={editItem?.color_front || ''}
                  onChange={(e) => setEditItem({ ...editItem, color_front: e.target.value } as ItemSensor)}
                  fullWidth
                  label="Color"
                >
                  {Object.values(SensorColor).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => handleSaveClick(propsFrio.id as string, propsCamara.id as string)} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
    </Box>
    }
    </div>
  );
};
