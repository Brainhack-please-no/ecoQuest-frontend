export type Profile = {
  id: string;
  name: string;
  image: string;
  friends: string[];
  statistics: {
    name: string;
    value: number;
  }[];
  medals: {
    name: string;
    image: string;
    description: string;
  }[];
};
