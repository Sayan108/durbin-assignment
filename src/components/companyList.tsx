import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterListIcon,
  GridRenderCellParams,
  GridSearchIcon,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import useServices from "../useServices";
import { CompanyData } from "../useServices";
import { Clear as ClearIcon } from "@mui/icons-material";
import { CloseOutlined } from "@mui/icons-material";
import { format } from "date-fns";
import { findObjectWithMatchingValue, formatDate } from "../utils";

const columns: GridColDef<CompanyData>[] = [
  {
    field: "companyName",
    headerName: "Company Name",
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: false,
  },
  {
    field: "performance",
    headerName: "Performance",
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridRenderCellParams<CompanyData, number>) => (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <LinearProgress
          variant="determinate"
          value={params.row.performance}
          sx={{
            width: "100%",
            height: "10px",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        />
        <Typography variant="body2" color="text.secondary">
          {`${params.row.performance}%`}
        </Typography>
      </Box>
    ),
    sortable: true,
    resizable: false,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 2,
    minWidth: 200,
    sortable: true,
    resizable: false,
  },
  {
    field: "lastChecked",
    headerName: "Last Checked",
    type: "number",
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: false,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridRenderCellParams<CompanyData, string>) => {
      const getColor = () => {
        switch (params.value) {
          case "Paid":
            return "green";
          case "Pending":
            return "yellow";
          case "Failed":
            return "red";
          default:
            return "gray";
        }
      };

      return (
        <Chip
          label={params.value}
          variant="outlined"
          sx={{
            fontWeight: "bold",
            borderColor: getColor(),
            color: getColor(),
          }}
        />
      );
    },
    sortable: true,
    resizable: false,
  },
];

const CompanyList = () => {
  const { dashBoardData, fetchAllDashBoardData } = useServices();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [performanceFilter, setPerformanceFilter] = useState("");
  const [filteredData, setFilteredData] = useState<CompanyData[]>([]);

  const handleClearAll = () => {
    setSearchTerm("");
    setStatusFilter("");
    setPerformanceFilter("");
  };

  const handleDateClear = () => {
    setSearchTerm("");
  };

  const handleDateInput = (value: string) => {
    setSearchTerm(formatDate(value));
  };

  const filteredRows =
    searchTerm.length > 2
      ? dashBoardData.filter((row) => {
          const matchesSearch =
            findObjectWithMatchingValue(row, searchTerm) !== null;

          const matchesStatus =
            statusFilter === "" || row.status === statusFilter;
          const matchesPerformance =
            performanceFilter === "" ||
            (performanceFilter === "0-30" && row.performance <= 30) ||
            (performanceFilter === "31-60" &&
              row.performance > 30 &&
              row.performance <= 60) ||
            (performanceFilter === "61-100" &&
              row.performance > 60 &&
              row.performance <= 100);

          return matchesSearch && matchesStatus && matchesPerformance;
        })
      : dashBoardData;
  useEffect(() => {
    fetchAllDashBoardData();
    console.log(dashBoardData, "getting data");
  }, []);

  useEffect(() => {
    setFilteredData(
      searchTerm.length > 2
        ? dashBoardData.filter((row) => {
            const matchesSearch =
              findObjectWithMatchingValue(row, searchTerm) !== null;

            const matchesStatus =
              statusFilter === "" || row.status === statusFilter;
            const matchesPerformance =
              performanceFilter === "" ||
              (performanceFilter === "0-30" && row.performance <= 30) ||
              (performanceFilter === "31-60" &&
                row.performance > 30 &&
                row.performance <= 60) ||
              (performanceFilter === "61-100" &&
                row.performance > 60 &&
                row.performance <= 100);

            return matchesSearch && matchesStatus && matchesPerformance;
          })
        : dashBoardData
    );
  }, [searchTerm]);

  return (
    <Box
      sx={{
        flex: 1,
        height: "auto",
        width: "100%",
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
        margin: "auto",
        maxWidth: "1200px",
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Vendor Activity History
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Track your vendors' activity daily.
      </Typography>
      <Divider sx={{ marginY: 2 }} />

      {/* Aligned search, dropdowns, and button */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        {searchTerm.length !== 0 && !isNaN(Number(searchTerm)) ? (
          <>
            <input
              style={{
                borderRadius: "20px",
                boxShadow: "1",
                flexGrow: 1,
                minWidth: "200px",
                height: "80%",
                padding: "10px",
              }}
              placeholder="Search for date"
              type="date"
              value={searchTerm}
              onChange={(e) => handleDateInput(e.target.value)}
            />
            <IconButton onClick={handleDateClear} edge="end">
              <ClearIcon />
            </IconButton>
          </>
        ) : (
          <OutlinedInput
            sx={{
              borderRadius: "20px",
              boxShadow: 1,
              flexGrow: 1,
              minWidth: "200px",
            }}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <GridSearchIcon />
              </InputAdornment>
            }
            endAdornment={
              searchTerm && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchTerm("")} edge="end">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        )}

        <FormControl
          sx={{
            minWidth: 150,
            boxShadow: 1,
            borderRadius: 1,
          }}
        >
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <GridFilterListIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{
            minWidth: 150,
            boxShadow: 1,
            borderRadius: 1,
          }}
        >
          <InputLabel id="performance-filter-label">Performance</InputLabel>
          <Select
            labelId="performance-filter-label"
            value={performanceFilter}
            label="Performance"
            onChange={(e) => setPerformanceFilter(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                {/* <AssessmentIcon /> */}
              </InputAdornment>
            }
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="0-30">0-30%</MenuItem>
            <MenuItem value="31-60">31-60%</MenuItem>
            <MenuItem value="61-100">61-100%</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClearAll}
          sx={{
            borderRadius: "20px",
            boxShadow: 1,
            textTransform: "none",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
          startIcon={<CloseOutlined />}
        >
          Clear All
        </Button>
      </Box>

      <Divider sx={{ marginY: 2 }} />
      <DataGrid
        disableColumnMenu
        rows={searchTerm.length > 2 ? filteredData : dashBoardData}
        columns={columns}
        // pagination
        getRowId={(row) => row.companyName + Math.random()}
        sx={{
          boxShadow: 2,
          borderRadius: 2,
          bgcolor: "background.paper",
          width: "100%",
          "& .MuiDataGrid-root": {
            overflowX: "auto",
          },
        }}
      />
    </Box>
  );
};

export default CompanyList;
