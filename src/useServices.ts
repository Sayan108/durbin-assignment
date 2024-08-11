import { useState } from "react";

import { AxiosResponse } from "axios";
import { getAllDashBoardData, getAllGraphData } from "./services";
export interface CompanyData {
  companyName: string;
  description: string;
  details: string;
  lastChecked: string;
  performance: number;
  status: string;
  website: string;
  matchedKey?: string;
}

const useServices = () => {
  const [dashBoardData, setDashBoardData] = useState<CompanyData[]>([]);
  const [graphData, setgraphData] = useState<any[]>([]);
  const fetchAllDashBoardData = async () => {
    try {
      const responase: AxiosResponse = await getAllDashBoardData();

      setDashBoardData(responase?.data?.data);
      console.log("Fetched Data:", responase?.data?.data, dashBoardData);
    } catch (error: any) {
      console.error(error);
    }
  };

  const fetchGraphData = async () => {
    try {
      const responase: AxiosResponse = await getAllGraphData();
      setgraphData(responase?.data?.data);
      console.log("Fetched Graph Data:", responase?.data?.data, graphData);
    } catch (error: any) {
      console.error(error);
    }
  };
  return {
    dashBoardData,
    fetchAllDashBoardData,
    graphData,
    fetchGraphData,
  };
};

export default useServices;
