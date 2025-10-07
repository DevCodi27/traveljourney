export type EntryProp = {
  id?: number;
  image: {
    src: string;
    alt: string;
  };
  country: string;
  location: string;
  place: string;
  date?: string;
  details: string;
};
