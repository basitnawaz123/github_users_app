import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";


import React, { FC, Fragment, useEffect, useState } from "react";
import IUserData from "./interfaces";
import { Link, useParams, useSearchParams } from "react-router-dom";

// interface userProps {
//   users: IUserData[];
// }

const ResultComponent: FC = ({}) => {
  // let count = users.length;

  const [user] = useSearchParams();
  const searchText = user.get("user");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [users, SetUsers] = useState<Array<IUserData>>([]);
  const [order, SetOrder] = useState("asc");
  const fetchUsers = () => {
    axios
      .get(`https://api.github.com/search/users?q=${searchText}`)
      .then((res) => {
        const users_data = res.data.items;
        const sortedData = users_data.sort((a: any, b: any) => {
          const loginA = a.login.toUpperCase();
          const loginB = b.login.toLowerCase();

          if (loginA > loginB) {
            return 1;
          }

          if (loginA < loginB) {
            return -1;
          }

          return 0;
        });

        SetUsers(sortedData);
      });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const sortRecord = () => {
    console.log("hello");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Fragment>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={3}>
        <Grid className='table' item xs={10}>
          <Link to='/'>
            <Button variant='contained'>Back To Home</Button>
          </Link>
          <TableContainer component={Paper}>
            {users.length > 0 ? (
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component='th' scope='row'>
                      <TableSortLabel onClick={sortRecord} direction='desc'>
                        Login
                      </TableSortLabel>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      Type
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      Avatar
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? users.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : users
                  ).map((row) => (
                    <TableRow key={row.login}>
                      <TableCell component='th' scope='row'>
                        {row.login}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>{row.type}</TableCell>
                      <TableCell style={{ width: 160 }}>
                        <Avatar
                          alt={row.login}
                          src={row.avatar_url}
                          sx={{ width: 50, height: 50 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[9, 18, 27]}
                      count={users.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            ) : (
              <Alert severity='error'>No Record Found.!</Alert>
            )}
          </TableContainer>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ResultComponent;
