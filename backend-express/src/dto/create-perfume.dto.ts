export class CreatePerfumeDto {
  name!: string;
  brand?: string;
  price?: number; // number côté API, converti en Decimal128 côté Mongo
  releaseDate?: Date;
  gender!: "male" | "female" | "unisex";
  imageUrl?: string;
  olfactoryFam?: string[];
  olfactoryNotes?: {
    top?: string[];
    heart?: string[];
    base?: string[];
  };
}
