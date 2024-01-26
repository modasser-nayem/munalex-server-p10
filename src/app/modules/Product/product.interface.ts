export type TOperatingSystem = "ios" | "android" | "windows" | "linux";

export type TSpecificationOptions = Record<string, string>;

export type TSpecification = {
  name: string;
  options: TSpecificationOptions;
};

export type TProduct = {
  name: string;
  price: number;
  quantity: number;
  releaseDate: Date;
  model: string;
  brand: string;
  category: string;
  image: string;
  specification: TSpecification[];
};

// export const specification: TSpecification[] = [
//   {
//     name: "Connectivity",
//     options: {
//       name: "dfd",
//       age: "43",
//     },
//   },
// ];
