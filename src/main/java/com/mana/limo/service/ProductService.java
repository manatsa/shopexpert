package com.mana.limo.service;

import com.mana.limo.domain.Product;

import java.util.List;

public interface ProductService {
    public List<Product> getAllProducts();
    public Product Save(Product product);

    public Product update(String id,Product product);

    public Product get(String id);

    public void incrementStock(String id, double stock);

    public void decrementStock(String id, double stock);
}
