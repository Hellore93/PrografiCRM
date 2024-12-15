import { QueryService } from "../services/queryService";

export const Fields = {

    insertProduct: async (forNew) => {
        const response = await QueryService.getAllProducts('Company Name');
        const normalizeResponse = response.map(item => { return { id: item.id, label: item.Name }; });
        normalizeResponse.push({ id: 0, label: 'Add new' });
        return {
            formId: 'NewProduct',
            title: forNew ? 'Add new Product' : 'Update Product',
            objectName: 'Product',
            submitButtonLabel: forNew ? 'ADD RECORD' : 'UPDATE',
            fields: [
                {
                    id: 'Company Id',
                    label: 'Company',
                    type: 'autocomplete',
                    size: 12,
                    options: normalizeResponse,
                    allowAddNew: true,
                },
                {
                    id: 'Name',
                    label: 'Name',
                    type: 'text',
                    size: 6,
                },
                {
                    id: 'Quantity',
                    label: 'Quantity',
                    type: 'number',
                    size: 6,
                },
            ]
        };
    },

    insertNewProductCompany: async () => {
        return {
            formId: 'newProductCompany',
            title: 'Add Product Company',
            objectName: 'Company Name',
            submitButtonLabel: 'ADD NEW COMPANY',
            fields: [
                {
                    id: 'Name',
                    label: 'Name of new Product Company',
                    type: 'text',
                    size: 12,
                }
            ]
        };
    }
}