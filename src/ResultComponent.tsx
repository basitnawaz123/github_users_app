import { Avatar, Button, Grid } from "@mui/material";
import axios from "axios";

import React, { FC, Fragment, useEffect, useState } from "react";
import IUserData from "./interfaces";
import { Link, useSearchParams } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const ResultComponent: FC = ({}) => {
  const [user] = useSearchParams();
  const searchText = user.get("user");

  const [users, SetUsers] = useState<Array<IUserData>>([]);
  const [loading, SetLoading] = useState(false);

  const fetchUsers = () => {
    SetLoading(true);
    axios
      .get(`https://api.github.com/search/users?q=${searchText}`)
      .then((res) => {
        const users_data = res.data.items;

        const sortedData = users_data.sort((a: any, b: any) => {
          if (a.login < b.login) {
            return -1;
          }
          if (a.login > b.login) {
            return 1;
          }
          return 0;
        });

        SetUsers(sortedData);
        SetLoading(false);
      });
  };

  const columns: GridColDef[] = [
    { field: "login", headerName: "Login", width: 400 },
    { field: "type", headerName: "Type", width: 400, sortable: false },
    {
      field: "avatar_url",
      headerName: "Avatar",
      width: 200,
      sortable: false,

      renderCell: (params) => (
        <Avatar
          src={params.value}
          variant='rounded'
          sx={{ width: 50, height: 50 }}
        />
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Fragment>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'>
        <Grid className='table' item xs={10}>
          <Link to='/'>
            <Button variant='contained'>Return to Home</Button>
          </Link>
          <div style={{ height: 600, background: "white", marginTop: 10 }}>
            <DataGrid
              initialState={{
                sorting: {
                  sortModel: [{ field: "login", sort: "asc" }],
                },
              }}
              sx={{
                boxShadow: 2,
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
              }}
              rows={users}
              columns={columns}
              pageSize={9}
              rowsPerPageOptions={[9]}
              data-testid='users_table'
            />
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ResultComponent;
