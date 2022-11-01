package com.mana.limo.service;

import com.mana.limo.domain.Sale;
import com.mana.limo.domain.SaleItem;

import java.util.List;

public interface SaleItemService {
    public List<SaleItem> getAllSaleItems();
    public SaleItem Save(SaleItem saleItem);

    public SaleItem update(SaleItem saleItem);

    public SaleItem get(String id);

    public List<SaleItem> getAllBySale(Sale sale);

    public void RemoveAllBySale(Sale sale);

    public SaleItem getByProductAndQuantity(String productId, int quantity);
    public void remove(SaleItem saleItem);
}
