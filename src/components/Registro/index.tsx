import React, { useState } from 'react';
import { 
  DataGrid, 
  GridColDef, 
  GridActionsCellItem 
} from '@mui/x-data-grid';
import { 
  Box, 
  Button, 
  Checkbox, 
  CircularProgress, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  FormControl, 
  InputLabel, 
  ListItemText, 
  MenuItem, 
  Select, 
  TextField, 
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { useActualizarUsuarioMutation, useAgregarUsuarioMutation, useBorrarUsuarioMutation, useGetFriosAllQuery, useGetUsersFriosQuery } from '../../api/frioApi';
import { ItemFrigorifico } from '../Avanzados/interfaces/avanzado.interface';

interface ItemUsers {
  id: string;       // Identificador único del elemento
  username: string;     // Nombre del elemento
  name: string;
  lastname: string;
  email: string;
  password: string;
  jobPositions: string;
  numberPhone: number;     
  role: RoleType;
  frigorifico: ItemFrigorifico[]; // Frigorifico
}

enum RoleType{
  USER = "USER",
  GERENTE = "GERENTE",
  ADMIN = "ADMIN"
}

export const RegistroUserComponent: React.FC = () => {

  const { data: users = [], error, isLoading, refetch } = useGetUsersFriosQuery({});
  const { data: frigorificos = [] } = useGetFriosAllQuery({});
  const [addItem] = useAgregarUsuarioMutation();
  const [updateItem] = useActualizarUsuarioMutation();
  const [deleteItem] = useBorrarUsuarioMutation();

  
  const [editItem, setEditItem] = useState<Partial<ItemUsers> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (error) {
    return (
      <section className="alert alert-danger">
        Falla de conexion con el servidor {/**error.data.message*/}
      </section>  
    );
  }
  
  const handleOpenDialog = (user: Partial<ItemUsers> | null) => {
    //console.log(user);
    setEditItem(user);
    setIsDialogOpen(true);
  };

  const handleEditClick = (item: ItemUsers) => {
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
    //console.log(editItem);
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

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Usuario', width: 150, editable: false },
    { field: 'name', headerName: 'Nombre', width: 150, editable: false },
    { field: 'lastname', headerName: 'Apellido', width: 150, editable: false },
    { field: 'email', headerName: 'Email', width: 150, editable: false },
    { field: 'jobPositions', headerName: 'Posicion', width: 150, editable: false },
    { field: 'numberPhone', headerName: 'Telefono', width: 150, editable: false },
    { field: 'role', headerName: 'Role', width: 150, editable: false },
    { field: 'frigorifico', headerName: 'Frigorificos', width: 150, editable: false,
      renderCell: (params) => {
        const value = params.value as ItemFrigorifico[];
        const labels = value.map(f => f.name).join(', ');
        return <span>{labels}</span>;
      },
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
    }
  ];

 // console.log("frigorifcos",data.data[0]!.frigorifico)

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
      Lista de usuarios registrados
    </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog({ name: '', frigorifico: [] })}
          style={{ marginBottom: '10px' }}
        >
          Agregar Usuario
        </Button>
        <DataGrid
          rows={users!.data}
          columns={columns}
          editMode="row"
          onRowEditStop={() => {}}
        />
        
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>{editItem ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Usuario"
              fullWidth
              variant="standard"
              value={editItem?.username || ''}
              onChange={(e) => setEditItem({ ...editItem, username: e.target.value } as ItemUsers)}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Passwordd"
              fullWidth
              variant="standard"
              value={editItem?.password || ''}
              onChange={(e) => setEditItem({ ...editItem, password: e.target.value } as ItemUsers)}
            />            
            <TextField
              autoFocus
              margin="dense"
              label="Nombre"
              fullWidth
              variant="standard"
              value={editItem?.name || ''}
              onChange={(e) => setEditItem({ ...editItem, name: e.target.value } as ItemUsers)}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Apellido"
              fullWidth
              variant="standard"
              value={editItem?.lastname || ''}
              onChange={(e) => setEditItem({ ...editItem, lastname: e.target.value } as ItemUsers)}
            />         
            <TextField
              autoFocus
              margin="dense"
              label="Email"
              fullWidth
              variant="standard"
              value={editItem?.email || ''}
              onChange={(e) => setEditItem({ ...editItem, email: e.target.value } as ItemUsers)}
            />      
            <TextField
              autoFocus
              margin="dense"
              label="Posicion"
              fullWidth
              variant="standard"
              value={editItem?.jobPositions || ''}
              onChange={(e) => setEditItem({ ...editItem, jobPositions: e.target.value } as ItemUsers)}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Telefono"
              fullWidth
              variant="standard"
              value={editItem?.numberPhone || ''}
              onChange={(e) => setEditItem({ ...editItem, numberPhone: Number(e.target.value)} as ItemUsers)}
            />
            <FormControl variant="standard" fullWidth >
              <InputLabel>Rol</InputLabel>
                <Select
                  value={editItem?.role || ''}
                  onChange={(e) => setEditItem({ ...editItem, role: e.target.value} as ItemUsers)}
                  fullWidth
                  label="Rol"
                  
                >
                  {Object.values(RoleType).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl> 
            <FormControl variant="standard" fullWidth >
              <InputLabel>Frigorificos</InputLabel>
              <Select
                fullWidth
                multiple
                value={editItem?.frigorifico?.map(f => f.id) || []}
                onChange={(e) => {
                  const selectedIds = e.target.value as string[];
                  const selectedOptions = frigorificos.data?.filter((f:ItemFrigorifico) => selectedIds.includes(f.id));
                  setEditItem((prev) => ({ ...prev, frigorifico: selectedOptions }));
                }}
                renderValue={(selected) => (selected as string[]).map(id =>frigorificos.data?.find((f:ItemFrigorifico) => f.id === id)?.name).join(', ')}
              >
                {frigorificos.data?.map((frigorifico: ItemFrigorifico) => (
                  <MenuItem key={frigorifico.id} value={frigorifico.id}>
                    <Checkbox checked={editItem?.frigorifico?.some(f => f.id === frigorifico.id) || false} />
                    <ListItemText primary={frigorifico.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl> 
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