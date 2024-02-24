import { Handler } from "express";
import { inventree } from "../../../../server";
import { AxiosError, AxiosResponse } from "axios";

export const deleteCategory: Handler = (req, res) => {
    inventree
        .delete(`api/stock/location/${req.params.id}/`)
        .then((response: AxiosResponse) => {
            res.status(204).json(response.data);
        })
        .catch((err: AxiosError) =>
            res.status(err.response?.status || 400).json(err),
        );
}