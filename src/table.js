import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function BasicTable({ cityData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 335 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              Current City: {cityData.currCity}
            </TableCell>
            {/* <TableCell align="right">Shipping Date</TableCell>
            <TableCell align="right">Order Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          <Card sx={{ minWidth: 335, minHeight: 100, textAlign: "center" }}>
            <Stack direction="column" spacing={1} sx={{ alignItems: "center" }}>
              <CardContent>
                <Typography
                  sx={{ mb: 0.5, fontSize: 14 }}
                  color="text.secondary"
                >
                  Current Temperature: {cityData.currTemp}°C
                </Typography>
                <Typography sx={{ mb: 0.5, fontSize: 14 }} color="text.secondary">
                  Current Weather:
                </Typography>
                <Typography color="text.primary">
                  {cityData.loading}
                  <img src={cityData.weatherIcon} alt="" />
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  {cityData.weatherDesc}
                </Typography>
              </CardContent>
            </Stack>
          </Card>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
