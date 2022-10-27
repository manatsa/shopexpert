package com.mana.limo.service;

import com.mana.limo.domain.Supplier;

import java.util.List;

public interface SupplierService {

    public List<Supplier> getAllSuppliers();

    public Supplier Save(Supplier supplier);

    public Supplier update(Supplier supplier);

    public Supplier get(String id);

}
