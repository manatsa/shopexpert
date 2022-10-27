package com.mana.limo.service.impl;

import com.mana.limo.domain.Supplier;
import com.mana.limo.domain.User;
import com.mana.limo.repo.SupplierRepo;
import com.mana.limo.service.SupplierService;
import com.mana.limo.service.UserService;
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
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    SupplierRepo repo;

    @Autowired
    UserService userService;

    @Autowired
    SupplierService supplierService;

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Supplier> getAllSuppliers() {
        return repo.findAll();
    }

    @Override
    public Supplier Save(Supplier supplier) {
            supplier.setCreatedBy(entityManager.find(User.class,userService.getCurrentUser().getId()));
            supplier.setDateCreated(new Date());
            supplier.setId(UUID.randomUUID().toString());
            return repo.save(supplier);
    }

    @Transactional
    @Override
    public Supplier update(Supplier supplier) {
        Supplier target=null;
        User user=userService.get(supplier.getCreatedBy().getId());
        if(supplier!=null && supplier.getId()!=null){
            target=entityManager.find(Supplier.class, supplier.getId());
            supplier.setModifiedBy(userService.getCurrentUser());
            BeanUtils.copyProperties(supplier, target);
            target.setDateModified(new Date());
            target.setCreatedBy(user);
            return entityManager.merge(target);
        }

        return null;
    }

    @Override
    public Supplier get(String id) {
        if(id!=null)
        return repo.getReferenceById(id);
        else{
            throw new IllegalArgumentException("Id cannot be empty!");
        }
    }


}
