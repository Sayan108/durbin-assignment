import { baseClient } from "./services.client";
import { endPoints } from "./services.constants";

export const getAllDashBoardData = () => {
  return baseClient.get(endPoints.getAllDashBoardData);
};

export const getAllGraphData = () => {
  return baseClient.get(endPoints.getGraphData);
};
