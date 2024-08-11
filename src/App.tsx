import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import CompanyList from "./components/companyList";
import GraphWithCheckbox from "./components/graphComponent";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import MyMapComponent from "./components/mapLocation";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/");
            }}
          >
            Company List
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/graph");
            }}
          >
            Graph
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/locateYourSelf");
            }}
          >
            Real Time Map
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<CompanyList />} />
        <Route path="/graph" element={<GraphWithCheckbox />} />
        <Route path="/locateYourSelf" element={<MyMapComponent />} />
      </Routes>
    </>
  );
}

export default App;
