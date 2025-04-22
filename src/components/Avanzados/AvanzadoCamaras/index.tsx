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
  Stack, 
  TextField, 
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { 
  frioApi,
  useActualizarCamaraMutation,
  useAgregarCamaraMutation, 
  useBorrarCamaraMutation, 
  useGetCamarasByFrioIdQuery,  
} from '../../../api/frioApi';
import { useNavigate } from 'react-router-dom';
import { ItemCamara, ItemFrigorifico } from '../interfaces/avanzado.interface';
import { useSelector } from 'react-redux';
//import { frigorificos } from '../../../api/frigorificos';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

type CardProps = {
  propsFrio: ItemFrigorifico//string;
}

export const AvanzadoCamaraComponent: React.FC<CardProps> = ({propsFrio}) => {

  const navigate = useNavigate();

  const { data = [], error, isLoading, refetch } = useGetCamarasByFrioIdQuery(propsFrio.id, {});
  const [addItem] = useAgregarCamaraMutation();
  const [updateItem] = useActualizarCamaraMutation();
  const [deleteItem] = useBorrarCamaraMutation();
  
  const [editItem, setEditItem] = useState<ItemCamara | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  //if (error) {
  //  return (
  //    <section className="alert alert-danger">
  //      Falla de conexion con el servidor {/**error.data.message*/}
  //    </section>
  //  );
  //}


  //console.log("Ver cámaras de frigorífico con ID:",frios.data.filter((item: any) => item.id === propsFrioid)[0].name);

  if (error) {
    if (typeof error === 'object' && error !== null) {
      if('data' in error)
      {
        return (
          <section className="alert alert-danger">
          Falla de conexion con el servidor <div>{JSON.stringify(error.data)}</div>
          </section>
        );
      }
      return (
        <section className="alert alert-danger">
          Falla de conexion con el servidor <div>{JSON.stringify(error)}</div>
        </section>
      );
    }
  }
  
  const handleAddClick = () => {
    setEditItem(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (item: ItemCamara) => {
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

  const handleSaveClick = async (frioId: string) => {
    if (editItem) {
      if (editItem.id) {
        await updateItem({id: editItem.id, name: editItem.name, frigorifico: frioId});
      } else {
        await addItem({name: editItem.name, frigorifico: frioId});
      }
      refetch();
      handleDialogClose();
    }
  }; 

  const handleViewSensoresClick = (frio: ItemFrigorifico, camara: ItemCamara) => {
    navigate("/avanzado/sensores",{state: {frio, camara}});
  };

  const handleViewFriosClick = () => {
    navigate("/avanzado");
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nombre', width: 150, editable: false },
    {
      field: 'frigorifico',
      headerName: 'frigorifico',
      width: 150,
      // Accediendo al valor anidado dentro de `item`
      valueGetter: (params, row) => row.frigorifico?.name ?? 'N/A',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          color="primary"
          label="Edit"
          onClick={() => handleEditClick(params.row)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          color="error"
          label="Delete"
          onClick={() => handleDeleteClick(params.row.id as string)}
        />,
      ],
    },
    {
      field: 'ir',
      headerName: 'Ver',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          startIcon={<NavigateNextIcon />} 
          onClick={() => handleViewSensoresClick(propsFrio, params.row)}
        >
          SENSORES
        </Button>
      ),
    }
  ];


  return (
    <div>
    {isLoading ? (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    ) :
    <Box sx={{ height: 400, width: '100%', padding: 2 }}>
      {/* Título del DataGrid */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
        Lista de camaras del frigorifico  {`${propsFrio?.name}`}
      </Typography>
      <Stack sx={{my: 2}} spacing={2} direction="row">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleViewFriosClick()}
          startIcon={<NavigateBeforeIcon />} 
        >
          FRIGORIFICOS
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          AGREGAR CAMARA
        </Button>
      </Stack>
      <DataGrid
        rows={data!.data}
        columns={columns}
        editMode="row"
        onRowEditStop={() => {}}
      />
        
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{editItem ? 'Editar Camara' : 'Agregar Camara'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            fullWidth
            variant="standard"
            value={editItem?.name || ''}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value } as ItemCamara)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleSaveClick(propsFrio.id as string)} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    }
    </div>
  );
};