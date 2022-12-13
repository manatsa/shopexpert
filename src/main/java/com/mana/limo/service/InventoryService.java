package com.mana.limo.service;

import com.mana.limo.domain.Inventory;
import com.mana.limo.domain.Product;

import java.util.List;

public interface InventoryService {
    public List<Inventory> getAllInventory();
    public Inventory save(Inventory inventory);

    public Inventory update(Inventory inventory);

    public Inventory get(String id);

    public Inventory findByProductAndPriceAndForeignCode(Product product, double price, String code);

    public List<Inventory> searchInventoryForSale(String term);
}
