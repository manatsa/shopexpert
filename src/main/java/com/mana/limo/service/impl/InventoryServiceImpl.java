package com.mana.limo.service.impl;

import com.mana.limo.domain.Inventory;
import com.mana.limo.domain.Inventory;
import com.mana.limo.domain.Product;
import com.mana.limo.domain.User;
import com.mana.limo.repo.InventoryRepo;
import com.mana.limo.service.InventoryService;
import com.mana.limo.service.UserService;
import com.mana.limo.util.StringUtils;
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
 * created on :: 15/11/2022
 * Package Name :: com.mana.limo.service.impl
 */

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private InventoryRepo inventoryRepo;

    @Autowired
    UserService userService;

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Inventory> getAllInventory() {
        return inventoryRepo.findAll();
    }

    @Override
    public Inventory save(Inventory inventory) {
        inventory.setCreatedBy(entityManager.find(User.class,userService.getCurrentUser().getId()));
        inventory.setDateCreated(new Date());
        inventory.setId(UUID.randomUUID().toString());
        return inventoryRepo.save(inventory);
    }

    @Override
    public Inventory update(Inventory inventory) {
        Inventory target=null;
        User user=userService.get(inventory.getCreatedBy().getId());
        if(inventory.getId()!=null){
            target=entityManager.find(Inventory.class, inventory.getId());
            inventory.setModifiedBy(userService.getCurrentUser());
            BeanUtils.copyProperties(inventory, target);
            target.setModifiedBy(entityManager.find(User.class,userService.getCurrentUser().getId()));
            target.setDateModified(new Date());
            target.setCreatedBy(user);
            return entityManager.merge(target);
        }

        return null;
    }

    @Override
    public Inventory get(String id) {
        return inventoryRepo.getById(id);
    }

    @Override
    public Inventory findByProductAndPriceAndForeignCode(Product product, double price, String code) {
        return inventoryRepo.findByPriceAndProductAndForeignCode(price,product, code);
    }

    @Override
    public List<Inventory> searchInventoryForSale(String term) {
        String camelTerm= StringUtils.toCamelCase2(term);
        return inventoryRepo.searchProductForSale(camelTerm);
    }
}
