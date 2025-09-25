import { DetailBestellung } from "./DetailBestellung";
interface Bestellung {
  id?: number;
  kundeId: number;
  total: number;
  status?: string;
  dateBestellung?: string;
  detailBestellungen: DetailBestellung[];
}
export { Bestellung };
