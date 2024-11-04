import React, { useEffect } from "react";
import { ProductService } from "../../services/queryService";

export const Home = () => {

    useEffect(() => {
        const products = ProductService.getAllProducts();
        console.log('Products >> ', products);
      }, []);

    return (
        <div>
            <p>Test czy działa</p>
        </div>
    )
}