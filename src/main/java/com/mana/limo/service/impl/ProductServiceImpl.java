package com.mana.limo.service.impl;

import com.mana.limo.domain.Product;
import com.mana.limo.domain.User;
import com.mana.limo.repo.ProductRepo;
import com.mana.limo.service.ProductService;
import com.mana.limo.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepo repo;

    @Autowired
    UserService userService;

    @Autowired
    ProductService productService;

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    @Override
    public Product Save(Product product) {
            product.setCreatedBy(entityManager.find(User.class,userService.getCurrentUser().getId()));
            product.setDateCreated(new Date());
            product.setId(UUID.randomUUID().toString());
            return repo.save(product);
    }

    @Override
    public Product update(String id,Product product) {
        Product target=null;
        if(id!=null){
            target=entityManager.find(Product.class, id);
            product.setModifiedBy(userService.getCurrentUser());
            BeanUtils.copyProperties(product, target);
            target.setDateModified(new Date());
            return entityManager.merge(target);
        }

        return null;
    }

    @Override
    public Product get(String id) {
        if(id!=null)
        return repo.getReferenceById(id);
        else{
            throw new IllegalArgumentException("Id cannot be empty!");
        }
    }

    @Override
    public void incrementStock(String id, double stock) {
        Product product=entityManager.find(Product.class, id);
        product.setStock(product.getStock()+stock);
    }

    @Transactional
    @Override
    public void decrementStock(String id, double stock) {
        Product product=entityManager.find(Product.class, id);
        product.setStock(product.getStock()-stock);
    }
}
