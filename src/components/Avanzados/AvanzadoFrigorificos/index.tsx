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
    useActualizarFrigorficoMutation, 
    useAgregarFrigorficoMutation, 
    useBorrarFrigorficoMutation, 
    useGetFriosAllQuery 
} from '../../../api/frioApi';
import { useNavigate } from 'react-router-dom';
import { ItemFrigorifico } from '../interfaces/avanzado.interface';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const AvanzadoFrigorificoComponent: React.FC = () => {

  const navigate = useNavigate();

  const { data = [], error, isLoading, refetch } = useGetFriosAllQuery({});
  const [addItem] = useAgregarFrigorficoMutation();
  const [updateItem] = useActualizarFrigorficoMutation();
  const [deleteItem] = useBorrarFrigorficoMutation();
  
  const [editItem, setEditItem] = useState<ItemFrigorifico | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  //const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});



  if (error) {
    return (
      <section className="alert alert-danger">
        Falla de conexion con el servidor {/**error.data.message*/}
      </section>
    );
  }
  
  const handleAddClick = () => {
    setEditItem(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (item: ItemFrigorifico) => {
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

  const handleSaveClick = async () => {
    if (editItem) {
      if (editItem.id) {
        await updateItem(editItem);
      } else {
        await addItem(editItem);
      }
      refetch();
      handleDialogClose();
    }
  };

  const handleViewCamerasClick = (frio: ItemFrigorifico) => {
    
    navigate("/avanzado/camaras",{state: {frio}});
  };




  

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nombre', width: 150, editable: false },
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
          onClick={() => handleViewCamerasClick(params.row)}
          startIcon={<NavigateNextIcon />}  // Ícono que aparece al principio del botón
        >
          CAMARAS
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
      <Box sx={{ height: '100%', width: '100%', padding: 2 }}>
        {/* Título del DataGrid */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
          Lista de frigorificos registrados
        </Typography>
        <Stack sx={{my: 2}} spacing={2} direction="row">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
          >
            AGREGAR FRIGORIFICOS
          </Button>
        </Stack>
        <DataGrid
          rows={data!.data}
          columns={columns}
          editMode="row"
          onRowEditStop={() => {}}
        />
        
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>{editItem ? 'Editar Frigorifico' : 'Agregar Frigorifico'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre"
              fullWidth
              variant="standard"
              value={editItem?.name || ''}
              onChange={(e) => setEditItem({ ...editItem, name: e.target.value } as ItemFrigorifico)}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSaveClick} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
    </Box>
    }
    </div>
  );
};