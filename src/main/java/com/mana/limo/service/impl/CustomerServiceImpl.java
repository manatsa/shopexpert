package com.mana.limo.service.impl;

import com.mana.limo.domain.Customer;
import com.mana.limo.domain.User;
import com.mana.limo.repo.CustomerRepo;
import com.mana.limo.service.CustomerService;
import com.mana.limo.service.UserService;
import com.mana.limo.util.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @author :: codemaster
 * created on :: 19/10/2022
 * Package Name :: com.mana.limo.service.impl
 */

@Service
@Transactional(propagation = Propagation.SUPPORTS)
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepo repo;

    @Autowired
    UserService userService;

    @Autowired
    CustomerService customerService;

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Customer> getAllCustomers() {
        return repo.findAll();
    }

    @Transactional
    @Override
    public List<Customer> searchActiveCustomers(String term) {
        return repo.getAllByActiveAndNameLike(Boolean.TRUE, term);
    }

    @Override
    public Customer searchCustomerByName(String name) {
        String camelName= StringUtils.toCamelCase3(name);
        return repo.getCustomerByName(camelName);
    }

    @Transactional
    @Override
    public Customer Save(Customer customer) {
        customer.setId(UUID.randomUUID().toString());
        customer.setCreatedBy(entityManager.find(User.class, userService.getCurrentUser().getId()));
        customer.setDateCreated(new Date());
        return repo.save(customer);
    }

    @Transactional
    @Override
    public Customer update(Customer customer) {
        Customer target=null;
        User user=userService.get(customer.getCreatedBy().getId());
        if(customer!=null && customer.getId()!=null){
            target=entityManager.find(Customer.class, customer.getId());
            target.setModifiedBy(entityManager.find(User.class,userService.getCurrentUser().getId()));
            BeanUtils.copyProperties(customer, target);
            target.setCreatedBy(user);
            target.setDateModified(new Date());
            return entityManager.merge(target);
        }

        return null;
    }

    @Override
    public Customer get(String id) {
        if(id!=null)
        return repo.getReferenceById(id);
        else{
            throw new IllegalArgumentException("Id cannot be empty!");
        }
    }


}
