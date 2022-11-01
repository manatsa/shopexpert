package com.mana.limo.controller.json;

import com.mana.limo.domain.Inventory;
import com.mana.limo.domain.Product;
import com.mana.limo.service.InventoryService;
import com.mana.limo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author :: codemaster
 * created on :: 19/10/2022
 * Package Name :: com.mana.limo.controller
 */

@RestController
@RequestMapping("/inventory")
public class InventoryJSONController {

    @Autowired
    ProductService productService;

    @Transactional
    @RequestMapping("/add-inventory")
    public List<Product> addInventory(@Param("productId")String productId, @Param("quantity") int quantity){
        Product product=productService.get(productId);
        product.setStock(product.getStock()+quantity);
        productService.update(productId,product);
        return productService.getAllProducts();
    }

    @Transactional
    @RequestMapping("/remove-inventory")
    public List<Product> removeInventory(@Param("productId")String productId, @Param("quantity") int quantity){
        Product product=productService.get(productId);
        product.setStock((product.getStock()-quantity)>0?(product.getStock()-quantity):0);
        productService.update(productId,product);
        return (product.getStock()-quantity)>0?productService.getAllProducts():null;
    }


}
