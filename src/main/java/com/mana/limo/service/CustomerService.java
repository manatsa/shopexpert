package com.mana.limo.service;

import com.mana.limo.domain.Customer;

import java.util.List;

public interface CustomerService {

    public List<Customer> getAllCustomers();

    public Customer Save(Customer supplier);

    public Customer update(Customer supplier);

    public Customer get(String id);

}
