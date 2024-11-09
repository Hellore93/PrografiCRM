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

  insertProduct: async (record) => {
    const {data, error, status} = await Supabase
      .from('Product')
      .insert([
        record,
      ]);

      console.log(data, error, status);
  },

  deleteProduct: async (record) => {
    await supabase
    .from('Product')
    .delete()
    .eq('some_column', 'someValue')
  }
}