import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Home from "./pages/Home";
import Stats from "./pages/Stats";

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Affordmed URL Shortener
          </Typography>
          <Box display="flex" gap={2}>
            <Button color="inherit" component={Link} to="/">
              Shorten URLs
            </Button>
            <Button color="inherit" component={Link} to="/stats">
              View Stats
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
};

export default App;
