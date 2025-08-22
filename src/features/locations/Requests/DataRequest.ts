import axios from "axios"
import { Location } from "../Types"
import TractianAPI from "../../HtttpClient";

export async function getLocations(id: string): Promise<Location[]> {
  const response = await TractianAPI.get<Location[]>(`/companies/${id}/locations`);
  return response.data;
}
