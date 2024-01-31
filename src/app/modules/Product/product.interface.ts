export type TOperatingSystem = "ios" | "android" | "windows" | "linux";

export type TProductFeatures = Record<string, string>;

export type TProduct = {
  name: string;
  price: number;
  quantity: number;
  releaseDate: Date;
  model: string;
  brand: string;
  category: string;
  operatingSystem?: string;
  connectivity: string[];
  powerSource: string;
  features: TProductFeatures;
  image: string;
  isDeleted?: boolean;
};
