/**
 * DTO pour la création d'un parfum
 * Ce que le client envoie au serveur (POST /api/perfumes)
 */

export interface CreatePerfumeDTO {
  name: string;
  brand: string;
  image?: string;
  olfactoryFamily?: string[];
  olfactoryNotes: {
      top: [{type: String}],
      heart: [{type: String}],
      base: [{type: String}],
    },
  price?: number;
}

/**
 * DTO pour la mise à jour d'un parfum
 * (PATCH /api/perfumes/:id)
 */
export interface UpdatePerfumeDTO {
  name?: string;
  brand?: string;
  image?: string;
  olfactoryFamily?: string[];
  olfactoryNotes: {
    top: [{type: String}],
    heart: [{type: String}],
    base: [{type: String}],
  },
  price?: number;
}

export interface UpdatePerfumeDTO extends Partial<CreatePerfumeDTO> {}
