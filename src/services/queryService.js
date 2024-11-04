import { Supabase } from "./credentialBase";

export const ProductService = {

    getAllProducts: async () => {
        const { data, error } = await Supabase
          .from('Product')
          .select('*');
    
        if (error) {
          throw new Error('Nie udało się pobrać produktów: ' + error.message);
        }
    
        return data;
      },
}