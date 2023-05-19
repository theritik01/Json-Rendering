import React, { useState } from "react";
import data from "./data.json";
import {
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";
import SearchIcon from "@mui/icons-material/SearchIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  searchIcon: {
    marginRight: theme.spacing(1),
  },
  card: {
    marginBottom: theme.spacing(2),
  },
}));

const App = () => {
  const classes = useStyles();
  const [developers, setDevelopers] = useState(data);
  const [filteredDevelopers, setFilteredDevelopers] = useState(data);
  const [searchName, setSearchName] = useState("");
  const [searchDesignation, setSearchDesignation] = useState("");

  const handleSearchName = (e) => {
    setSearchName(e.target.value);
    filterDevelopers(e.target.value, searchDesignation);
  };

  const handleSearchDesignation = (e) => {
    setSearchDesignation(e.target.value);
    filterDevelopers(searchName, e.target.value);
  };

  const filterDevelopers = (name, designation) => {
    const filteredByName = developers.filter((developer) =>
      developer.name.toLowerCase().includes(name.toLowerCase())
    );

    const filteredByDesignation = developers.filter((developer) =>
      developer.designation.toLowerCase().includes(designation.toLowerCase())
    );

    if (name && designation) {
      setFilteredDevelopers(
        filteredByName.filter((developer) =>
          filteredByDesignation.includes(developer)
        )
      );
    } else if (name) {
      setFilteredDevelopers(filteredByName);
    } else if (designation) {
      setFilteredDevelopers(filteredByDesignation);
    } else {
      setFilteredDevelopers(developers);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.searchContainer}>
        <SearchIcon className={classes.searchIcon} />
        <TextField
          label="Search by name"
          value={searchName}
          onChange={handleSearchName}
        />
        <TextField
          label="Filter by designation"
          value={searchDesignation}
          onChange={handleSearchDesignation}
        />
      </div>
      <Grid container spacing={2}>
        {filteredDevelopers.map((developer) => (
          <Grid item xs={12} sm={6} md={4} key={developer.id}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" component="h3">
                  {developer.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {developer.designation}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Skills: {developer.skills.join(", ")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Email: {developer.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Phone: {developer.phone}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;
