import React, { useEffect, useState } from 'react';
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


function OperationsTable({ data, handleEdit }) {
  const { updateStoreData } = useStore();
  const [offset, setOffset] = useState(0)
  const [page, setPage] = useState(1)
  const handleDelete = async (id) => {
    const response = await operationsService.deleteOperation(id);
    if (response.data.code === 200) {
      return updateStoreData()
    }
  }

  useEffect(() => {

    offset === 0 ? setPage(1) : setPage((offset / 10) + 1);
    updateStoreData(offset)
  }, [offset])

  const handlePageView = async (type) => {
    switch (type) {
      case "prev":
        if (offset >= 10) {
          setOffset(offset - 10)

        }
        break;
      case "next":
        if (!(offset + 10 >= data.totalRecords)) {
          setOffset(offset + 10)
        }
        break;
      default:
        break;
    }
  }

  return (
    <div className="tableContainer">
      {
        data.data.length !== 0 &&

        <div style={{ display: 'flex', justifyContent: "space-between" }}>
          <button onClick={() => handlePageView("prev")}>PREV</button>
          <p>{page}/{Math.ceil(data.totalRecords / 10)}</p>
          <button onClick={() => handlePageView("next")}>NEXT</button>

        </div>
      }

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
              data.data.length === 0 &&
              <TableRow>
                <TableCell align="center" colSpan="6">No se han encontrado operaciones</TableCell>
              </TableRow>
            }

            {data.data.map((element) => (
              <TableRow key={element.id}>
                <TableCell component="th" scope="row">
                  {Number(element.type) ? "Ingreso" : "Egreso"}
                </TableCell>
                <TableCell align="center">{element.amount}</TableCell>
                <TableCell align="center">{element.concept}</TableCell>
                <TableCell align="center">{element.date}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEdit(element)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(element.id)}>
                    <Delete />
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