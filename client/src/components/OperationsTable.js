import React, { useEffect } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton, Table } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import operationsService from '../services/operationsService';
import { useStore } from "../store/StoreProvider";


function OperationsTable({ data,  handleEdit }) {
  const {token, updateStoreData} = useStore();
  const handleDelete = async (id) => {
    const response= await operationsService.deleteOperation(token, id);
    if(response.data.code === 200){
      return updateStoreData()
    }
  }

  return (
    <div className="tableContainer">

    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Tipo</TableCell>
            <TableCell align="center">Monto</TableCell>
            <TableCell align="center">Concepto</TableCell>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {
            data.length === 0 &&
            <TableRow>
              <TableCell align="center" colSpan="6">No se han encontrado operaciones</TableCell>
            </TableRow>
          }

          {data.map((element) => (
            <TableRow key={element.id}>
              <TableCell component="th" scope="row">
                {Number(element.type) ? "Ingreso" : "Egreso"}
              </TableCell>
              <TableCell align="center">{element.amount}</TableCell>
              <TableCell align="center">{element.concept}</TableCell>
              <TableCell align="center">{element.date}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => handleEdit(element)}>
                  <Edit/>
                </IconButton>
                <IconButton onClick={() => handleDelete(element.id)}>
                  <Delete/>
                </IconButton>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}


export default OperationsTable