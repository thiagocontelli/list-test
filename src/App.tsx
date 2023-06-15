import { Container, CssBaseline } from "@mui/material";
import { Home } from "./Home";

export function App() {
  return (
    <Container sx={{ py: '3rem' }}>
      <CssBaseline />
      <Home />
    </Container>
  )
}
