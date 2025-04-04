import {
  Box,
  Button,
  IconButton,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import PropTypes from "prop-types";

const CustomTable = ({ columns, rows = [], onAddNew, loading }) => {
  return (
    <Box sx={{ height: "100%", border: 1, borderColor: "divider" }}>
      <Stack direction="row" justifyContent="space-between" px={1} pt={1}>
        <TextField
          sx={{ flex: 0.5 }}
          label="Search here ..."
          size="small"
          placeholder="Search here ..."
          InputProps={{
            endAdornment: (
              <IconButton>
                <IconSearch />
              </IconButton>
            ),
          }}
        />
        <Box flex={1}></Box>
        <Button variant="contained" onClick={onAddNew}>
          Add New
        </Button>
      </Stack>
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Table aria-label="data-table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell key={index} align={col.align || "left"}>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    // sx={{ fontSize: "15px", fontWeight: "500" }}
                  >
                    {col.headerName}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {loading ? (
            <SkeletonTable />
          ) : (
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    backgroundColor: rowIndex % 2 === 0 ? "#f9f9f9" : "white",
                  }}
                >
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex} align={col.align || "left"}>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {col.renderCell
                          ? col.renderCell(row[col.field], row)
                          : row[col.field]}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Box>
    </Box>
  );
};

const SkeletonTable = () => {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton variant="rectangular" width={40} height={40} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={120} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={150} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={50} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={50} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={80} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      align: PropTypes.string,
      flex: PropTypes.number,
      renderCell: PropTypes.func,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddNew: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default CustomTable;
