package com.mana.limo.service;

import com.mana.limo.domain.Inventory;
import com.mana.limo.domain.Product;

import java.util.List;

public interface InventoryService {
    public List<Inventory> getAllInventory();
    public Inventory Save(Inventory inventory);

    public Inventory get(String id);
}
