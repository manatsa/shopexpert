package com.mana.limo.service.impl;

import com.mana.limo.domain.*;
import com.mana.limo.repo.SaleItemRepo;
import com.mana.limo.service.InventoryService;
import com.mana.limo.service.ProductService;
import com.mana.limo.service.SaleItemService;
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
 * created on :: 25/10/2022
 * Package Name :: com.mana.limo.service.impl
 */

@Service
@Transactional(propagation = Propagation.SUPPORTS)
public class SaleItemServiceImpl implements SaleItemService {
    @Autowired
    SaleItemRepo saleItemRepo;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    UserService userService;

    @Autowired
    ProductService productService;

    @Autowired
    InventoryService inventoryService;

    @Override
    public List<SaleItem> getAllSaleItems() {
        return saleItemRepo.findAll();
    }

    @Transactional
    @Override
    public SaleItem Save(SaleItem saleItem) {
        if(saleItem!=null){
            saleItem.setInventory(inventoryService.get(saleItem.getInventory().getId()));
            return saleItemRepo.save(saleItem);
        }
        return null;
    }

    @Transactional
    @Override
    public SaleItem update(SaleItem saleItem) {
        SaleItem target=null;
        if(saleItem!=null && saleItem.getId()>-1){
            target=entityManager.find(SaleItem.class, saleItem.getId());
            BeanUtils.copyProperties(saleItem, target);
            return entityManager.merge(target);
        }

        return null;
    }

    @Override
    public SaleItem get(String id) {
        return saleItemRepo.getById(id);
    }

    @Override
    public List<SaleItem> getAllBySale(Sale sale) {
        return saleItemRepo.getAllBySaleId(sale.getId());
    }

    @Override
    public void RemoveAllBySale(Sale sale) {
        saleItemRepo.deleteAllBySaleId(sale.getId());
    }

    @Override
    public SaleItem getByProductAndQuantity(String inventoryId, int quantity) {
        return saleItemRepo.getByInventoryIdAndQuantity(inventoryId, quantity);
    }

    @Override
    public void remove(SaleItem saleItem) {
        saleItemRepo.delete(saleItem);
    }


}
