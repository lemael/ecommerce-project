interface Bestellung {
  KundeId: number;
  DateBestellung: string;
  Total: number;
  DetailBestellungen: {
    ProduktId: number;
    Menge: number;
    Preis: number;
  }[];
}
export { Bestellung };
