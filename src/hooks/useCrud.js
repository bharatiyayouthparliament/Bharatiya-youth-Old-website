
import React from 'react';
import { getApi } from '@/utils/api';

const useCrud = (resourceName) => {
    const [items, setItems] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const api = getApi(resourceName); // now blogs = fixed blogApi

    const fetchItems = React.useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error: apiError } = await api.getAll();
            if (apiError) throw new Error(apiError);
            setItems(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [api]);

    React.useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const addItem = async (newItemData) => {
        setLoading(true);
        const { data, error: apiError } = await api.create(newItemData, items);
        if (apiError) {
            setLoading(false);
            return { error: apiError };
        }
        await fetchItems();
        return { data, error: null };
    };

    const updateItem = async (id, updatedData) => {
        setLoading(true);
        const { data, error: apiError } = await api.update(id, updatedData);
        if (apiError) {
            setLoading(false);
            return { error: apiError };
        }
        await fetchItems();
        return { data, error: null };
    };

    const deleteItem = async (id) => {
        setLoading(true);
        const { data, error: apiError } = await api.delete(id);
        if (apiError) {
            setLoading(false);
            return { error: apiError };
        }
        await fetchItems();
        return { data, error: null };
    };

    return { items, loading, error, addItem, updateItem, deleteItem, refetch: fetchItems };
};

export default useCrud;
