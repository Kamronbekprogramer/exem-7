import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import { productsApi } from "../../../service";
import { IconButton, Button, Tooltip } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(35,137,218,1)",
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomizedTables = ({ data }) => {
  const navigate = useNavigate();
  const deleteItem = async (id) => {
    try {
      const response = await productsApi.delete(id);
      if (response.status === 200 || response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = (id) => {
    console.log(`Upload action clicked for product with ID: ${id}`);
  };
  const handleNavigate = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T/R</StyledTableCell>
              <StyledTableCell align="center">Product Name</StyledTableCell>
              <StyledTableCell align="center">Color</StyledTableCell>
              <StyledTableCell align="center">Size</StyledTableCell>
              <StyledTableCell align="center">Count</StyledTableCell>
              <StyledTableCell align="center">Cost</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.product_name}
                </StyledTableCell>
                <StyledTableCell align="center">{item.color}</StyledTableCell>
                <StyledTableCell align="center">{item.size}</StyledTableCell>
                <StyledTableCell align="center">{item.count}</StyledTableCell>
                <StyledTableCell align="center">{item.cost}</StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title="Delete" arrow>
                    <IconButton>
                    <DeleteIcon
                      onClick={() => deleteItem(item.product_id)}
                      color="error"
                      sx={{ color: "red" }}
                    />
                    </IconButton>
                    
                  </Tooltip>
                  <Tooltip title="View" arrow>
                    <IconButton onClick={() => handleNavigate(item.product_id)}>
                      <VisibilityIcon sx={{ color: "blue" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Upload Image" arrow>
                    <IconButton
                      onClick={() => handleUpload(item.product_id)}
                      aria-label="upload image"
                    >
                      <AddPhotoAlternateIcon sx={{ color: "green" }} />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomizedTables;
