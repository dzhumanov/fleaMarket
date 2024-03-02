import { Container, CssBaseline, Grid } from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import { Route, Routes } from "react-router-dom";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import Items from "./features/items/Items";
import NavBar from "./components/UI/NavBar/NavBar";

function App() {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item lg={3}>
              <NavBar />
            </Grid>
            <Grid item lg={9}>
              <Routes>
                <Route path="/" element={<Items />} />
                <Route path="/category/:id" element={<Items />} />
                {/* <Route path="/items/:id" element={} /> */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<h1>Not found</h1>} />
              </Routes>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
}

export default App;
