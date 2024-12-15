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

  insertRecord: async (record, objectName) => {
    const { data, error, status } = await Supabase
      .from(objectName)
      .insert([
        record,
      ])
      .select();

    return { data };
  },

  updateRecord: async (record, objectName) => {
    const { data, error } = await Supabase
      .from(objectName)
      .update(record)
      .eq('id', record.id)
      .select()
    return { data };
  },

  deleteProduct: async (record, objectName) => {
    const { data, error, status } = await Supabase
      .from(objectName)
      .delete()
      .eq('id', record.id);
  }
}