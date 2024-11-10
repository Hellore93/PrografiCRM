import { Supabase } from "./credentialBase";

export const QueryService = {

  getAllProducts: async (objectName) => {
    const { data, error } = await Supabase
      .from(objectName)
      .select('*');

    if (error) {
      throw new Error('Nie udało się pobrać produktów: ' + error.message);
    }

    return data;
  },

  insertProduct: async (record) => {
    const { data, error, status } = await Supabase
      .from('Product')
      .insert([
        record,
      ]);

    console.log(data, error, status);
  },

  deleteProduct: async (record) => {
    const { data, error, status } = await Supabase
      .from('Product')
      .delete()
      .eq('id', record.id);

    console.log(data, error, status);
  }
}