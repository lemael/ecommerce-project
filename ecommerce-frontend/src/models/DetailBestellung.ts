import { Bestellung } from "./Bestellung";
interface DetailBestellung {
  id?: number;
  produktId: number;
  menge: number;
  preis: number;
  produkt?: {
    name: string;
    price: number;
  };
  bestellungId?: number;
  bestellung?: Bestellung;
}
export { DetailBestellung };
