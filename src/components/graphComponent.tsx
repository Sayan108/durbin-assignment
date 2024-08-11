import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import useServices from "../useServices";

const categories = Array.from({ length: 10 }, (_, i) => `Day ${i + 1}`);

const GraphWithCheckboxes = () => {
  const { graphData, fetchGraphData } = useServices();
  const [selectedData, setSelectedData] = useState<string[]>([
    "aqi_data",
    "blood_pressure_data",
  ]);

  const handleSelectChange = (event: any) => {
    const value = event.target.value;
    setSelectedData(typeof value === "string" ? value.split(",") : value);
  };

  const series = selectedData.map((key) => ({
    name: key.replace(/_/g, " ").toUpperCase(),
    data: graphData[key as keyof typeof graphData],
  }));

  const options = {
    chart: {
      type: "line" as const,
      height: "100%",
      toolbar: {
        show: true,
      },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 2,
        blur: 4,
        opacity: 0.2,
      },
    },
    xaxis: {
      categories,
    },
    title: {
      text: "Health and Activity Metrics",
      align: "center" as const,
      style: {
        fontSize: "18px",
      },
    },
    yaxis: {
      title: {
        text: "Values",
      },
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 250,
          },
          title: {
            style: {
              fontSize: "14px",
            },
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },
        },
      },
    ],
  };

  useEffect(() => {
    fetchGraphData();
  }, []);

  return (
    <Box
      sx={{
        padding: "20px",
        boxShadow: 3,
        borderRadius: "8px",
        backgroundColor: "#fff",
        maxWidth: "100%",
      }}
    >
      <FormControl fullWidth>
        <InputLabel>Metrics</InputLabel>
        <Select
          multiple
          displayEmpty
          value={selectedData}
          onChange={handleSelectChange}
          renderValue={(selected) => selected.join(", ") || "Select Metrics"}
          style={{ width: "40%", marginBottom: "20px" }}
        >
          {Object.keys(graphData).map((key) => (
            <MenuItem key={key} value={key}>
              <Checkbox checked={selectedData.indexOf(key) > -1} />
              <ListItemText primary={key.replace(/_/g, " ").toUpperCase()} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </Box>
  );
};

export default GraphWithCheckboxes;
