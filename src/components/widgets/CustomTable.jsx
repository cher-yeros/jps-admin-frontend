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
import { DataGrid } from "@mui/x-data-grid";
import { IconSearch } from "@tabler/icons-react";
import PropTypes from "prop-types";

const CustomTable2 = ({ columns, rows = [], onAddNew, loading }) => {
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
                <TableCell
                  sx={{ flex: col?.index }}
                  key={index}
                  align={col.align || "left"}
                >
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
                    <TableCell
                      sx={{ flex: col?.index }}
                      key={colIndex}
                      align={col.align || "left"}
                    >
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

export const CustomTable1 = ({ columns, rows = [], onAddNew, loading }) => {
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

      <Box sx={{ overflow: "auto", width: "100%", mt: 2 }}>
        {/* Table Header */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            borderBottom: 1,
            borderColor: "divider",
            backgroundColor: "#f1f1f1",
            py: 1,
          }}
        >
          {columns.map((col, index) => (
            <Box
              key={index}
              sx={{
                flex: col.flex || 1,
                textAlign: col.align || "left",
                px: 2,
              }}
            >
              <Typography variant="subtitle2" fontWeight={600}>
                {col.headerName}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Table Body */}
        {loading ? (
          <SkeletonTable />
        ) : (
          rows.map((row, rowIndex) => (
            <Box
              key={rowIndex}
              sx={{
                display: "flex",
                width: "100%",
                backgroundColor: rowIndex % 2 === 0 ? "#f9f9f9" : "white",
                py: 1,
              }}
            >
              {columns.map((col, colIndex) => (
                <Box
                  key={colIndex}
                  sx={{
                    flex: col.flex || 1,
                    textAlign: col.align || "left",
                    px: 2,
                  }}
                >
                  <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                    {col.renderCell
                      ? col.renderCell(row[col.field], row)
                      : row[col.field]}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export const CustomTable = ({ columns, rows = [], onAddNew, loading }) => {
  return (
    <Box sx={{ height: "100%", border: 1, borderColor: "divider" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        px={1}
        pt={1}
        border={0}
      >
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
        {onAddNew && (
          <Button variant="contained" onClick={onAddNew}>
            Add New
          </Button>
        )}
      </Stack>

      <Box
        sx={{ height: "calc(100% - 3rem)", width: "100%", mt: 0, border: 0 }}
      >
        <DataGrid
          columns={columns?.map((col) => ({
            ...col,
            flex: col?.headerName !== "Actions" ? col?.flex || 1 : null,
            // width: col?.headerName === "Actions" ? 100 || 1 : null,
          }))}
          rows={rows}
          loading={loading}
          disableRowSelectionOnClick
          // sx={
          //   {
          //     // "& .MuiDataGrid-columnHeaders": {
          //     //   backgroundColor: "#f5f5f5",
          //     // },
          //   }
          // }
          getRowId={(row) => row.id || row._id} // adjust this as needed
        />
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
