package com.mana.limo.service;

import com.mana.limo.domain.Sale;

import java.util.List;

public interface SaleService {
    public List<Sale> getAllSales();

    public List<Sale> getAllActiveSales();
    public Sale Save(Sale sale);

    public Sale update(Sale sale);

    public Sale get(String id);

    public void makeSale(String id, double stock);

    public void reverseSale(String id, double stock);
}
