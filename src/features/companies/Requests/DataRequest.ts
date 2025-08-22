import axios from "axios"
import { Company } from "../Types"
import TractianAPI from "../../HtttpClient";

export async function getCompanies(): Promise<Company[]> {
  const response = await TractianAPI.get<Company[]>("/companies");
  return response.data;
}
