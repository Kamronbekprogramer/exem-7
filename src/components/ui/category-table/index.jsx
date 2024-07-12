import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { category } from "../../../service";
import { useState } from "react";
import { CategoryModal } from "@modal";
import { Tooltip } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(35,137,218,1)",
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "8px 16px",
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

const TableHeader = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  "& .MuiTableCell-root": {
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
}));

const CustomizedTables = ({ data }) => {
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);

  const editItem = (item) => {
    setEdit(item);
    setOpen(true);
  };

  const deleteItem = async (id) => {
    try {
      const response = await category.delete(id);
      if (response.status === 200 || response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CategoryModal
        item={edit}
        open={open}
        handleClose={() => setOpen(false)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHeader>
            <TableRow>
              <StyledTableCell align="center">T/R</StyledTableCell>
              <StyledTableCell align="center">Category Name</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, index) => (
              <StyledTableRow key={item.category_id}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">{item.category_name}</StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title="Delete" arrow>
                    <IconButton onClick={() => deleteItem(item.category_id)} color="error">
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit" arrow>
                    <IconButton onClick={() => editItem(item)} color="primary">
                      <EditIcon sx={{ color: "blue" }} />
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


