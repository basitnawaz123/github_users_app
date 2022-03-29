import React, { ChangeEvent, Fragment, useState } from "react";

import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const SearchComponent = () => {
  let navigate = useNavigate();
  const [searchText, SetSearchText] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, SetLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    SetSearchText(e.target.value);
  };
  const fetchUsers = async () => {
    SetLoading(true);
    if (searchText === "") {
      setError(true);
      SetLoading(false);
    } else {
      setError(false);
      SetLoading(true);
      setTimeout(() => {
        navigate(`/result?user=${searchText}`);
      }, 1000);
    }
  };

  return (
    <Fragment>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={3}>
        <Grid className='card' item xs={4}>
          <Card sx={{ minWidth: 275 }} variant='outlined'>
            <CardContent>
              {error ? (
                <Alert severity='error'>Please enter something</Alert>
              ) : (
                ""
              )}
              <TextField
                className='search_field'
                fullWidth
                label='Enter your Name'
                onChange={handleChange}
              />
              <Button onClick={fetchUsers} variant='contained' fullWidth>
                {loading ? <CircularProgress color='inherit' /> : "Search"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SearchComponent;
