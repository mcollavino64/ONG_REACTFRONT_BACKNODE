import React, { useState, useEffect } from "react";

import "../Backoffice/index.css";

import { Box } from "@chakra-ui/layout";

import MaterialTable from "material-table";

import { useSelector, useDispatch } from "react-redux";
import { fetchUsersData, usersInfoData } from "../../app/usersInfoSlice";

export default function BackofficeUsers() {
  const dispatch = useDispatch();
  // lista de usuarios recibido del store
  const usersData = useSelector(usersInfoData);
  // creo una nueva instancia de la información recibida ya que sino material-table no me deja pasárselo como parámetro a el objeto data
  const dataForTable = usersData?.map((user) => ({ ...user })) || {};

  // uso el dispatch para ejecutar la función creada en el slice y así actualizar los datos en el store
  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);

  // objeto para configurar el idioma de los mensajes por defecto en material-table
  const localization = {
    header: {
      actions: "Acciones",
    },
    body: {
      emptyDataSourceMessage: "No se han encontrado usuarios",
      addTooltip: "Agregar",
      deleteTooltip: "Eliminar",
      editTooltip: "Editar",
      editRow: {
        deleteText: "¿Seguro que desea eliminarlo?",
        cancelTooltip: "Cancelar",
        saveTooltip: "Confirmar",
      },
    },
    toolbar: { searchPlaceholder: "Buscar" },
  };

  //configuración de columnas de material-table
  const columns = [
      {
        title: "Nombre",
        field: "firstName",
      },
      {
        title: "Apellido",
        field: "lastName",
        initialEditValue: "initial edit value",
      },
      { title: "Email", field: "email" },
    ]

  return (
    <div>
      <Box
        bg="#F5F6F9"
        mx="auto"
        w="97%"
        mt={10}
        color="#18A0FB"
      >
        <MaterialTable
          title="Lista de usuarios"
          columns={columns}
          data={dataForTable}
          localization={localization}
          options={{
            paging: false,
            search: true,

            headerStyle: {
              backgroundColor: "#18A0FB",
              color: "#FFF",
            },
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...dataForTable];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  //  setData([...dataUpdate]);
                  //llenar con las funciones correspondientes cuando se deba

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...dataForTable];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  //  setData([...dataDelete]);
                  //llenar con las funciones correspondientes cuando se deba

                  resolve();
                }, 1000);
              }),
          }}
        />
      </Box>
    </div>
  );
}
