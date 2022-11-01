package com.mana.limo.service;

import com.mana.limo.domain.Customer;

import java.util.List;

public interface CustomerService {

    public List<Customer> getAllCustomers();

    public List<Customer> searchActiveCustomers(String term);

    public Customer searchCustomerByName(String name);

    public Customer Save(Customer supplier);

    public Customer update(Customer supplier);

    public Customer get(String id);

}
