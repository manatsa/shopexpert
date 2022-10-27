package com.mana.limo.service.impl;

import com.mana.limo.domain.Product;
import com.mana.limo.domain.Sale;
import com.mana.limo.domain.User;
import com.mana.limo.repo.SaleRepo;
import com.mana.limo.service.SaleService;
import com.mana.limo.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @author :: codemaster
 * created on :: 25/10/2022
 * Package Name :: com.mana.limo.service.impl
 */

@Service
public class SaleServiceImpl implements SaleService {
    @Autowired
    SaleRepo saleRepo;

    @Autowired
    UserService userService;

    @PersistenceContext
    EntityManager entityManager;


    @Override
    public List<Sale> getAllSales() {
        return saleRepo.findAll();
    }

    @Override
    public Sale Save(Sale sale) {
        if(sale!=null){
            sale.setCreatedBy(entityManager.find(User.class,userService.getCurrentUser().getId()));
            sale.setDateCreated(new Date());
            sale.setId(UUID.randomUUID().toString());
            return saleRepo.save(sale);
        }
        return null;
    }

    @Override
    public Sale update(Sale sale) {
        Sale target=null;
        if(sale!=null && sale.getId()!=null){
            target=entityManager.find(Sale.class, sale.getId());
            target.setModifiedBy(userService.getCurrentUser());
            BeanUtils.copyProperties(sale, target);
            target.setDateModified(new Date());
            return entityManager.merge(target);
        }

        return null;
    }

    @Override
    public Sale get(String id) {
        return null;
    }

    @Override
    public void makeSale(String id, double stock) {

    }

    @Override
    public void reverseSale(String id, double stock) {

    }
}
