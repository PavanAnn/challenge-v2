import { Assets } from "../Types"
import TractianAPI from "../../HtttpClient";

export async function getAssets(id: string): Promise<Assets[]> {
  const response = await TractianAPI.get<Assets[]>(`/companies/${id}/assets`);
  return response.data;
}
