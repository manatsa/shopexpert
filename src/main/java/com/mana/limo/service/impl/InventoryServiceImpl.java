package com.mana.limo.service.impl;

import com.mana.limo.domain.Inventory;
import com.mana.limo.domain.Product;
import com.mana.limo.repo.InventoryRepo;
import com.mana.limo.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @author :: codemaster
 * created on :: 19/10/2022
 * Package Name :: com.mana.limo.service.impl
 */
@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    InventoryRepo repo;

    @Override
    public List<Inventory> getAllInventory() {
        return repo.findAll();
    }

    @Override
    public Inventory Save(Inventory inventory) {
        if(inventory.getId()==null){
            //product.setCreatedBy(userService.get(userService.getCurrentUser().getId()));
            inventory.setDateCreated(new Date());
            inventory.setId(UUID.randomUUID().toString());
            return repo.save(inventory);
        }else{
            //product.setModifiedBy(userService.get(userService.getCurrentUser().getId()));
            inventory.setDateModified(new Date());
            //Inventory i=get(inventory.getId());
            //BeanUtils.copyProperties(product, p);
            return repo.save(inventory);
        }

    }

    @Override
    public Inventory get(String id) {
        return null;
    }
}
