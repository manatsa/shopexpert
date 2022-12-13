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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

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

    @Autowired
    InventoryService inventoryService;

    @RequestMapping("/list")
    public List<Inventory> getAllInventory(){
        return inventoryService.getAllInventory();
    }

    @Transactional
    @RequestMapping("/add-inventory")
    public List<Product> addInventory(@RequestParam("productId")String productId, @RequestParam("quantity") int quantity, @RequestParam("price") double price,
                                      @RequestParam("cost") double cost,@RequestParam("description") String description, @Param("fcode") String fcode){
        Product product=productService.get(productId);
        Inventory inventory=inventoryService.findByProductAndPriceAndForeignCode(product, price, fcode);
        if(inventory!=null) {
            inventory.setQuantity(inventory.getQuantity() + quantity);
            Inventory inventory1 = inventoryService.update(inventory);
        }else{
            inventory=new Inventory(description, quantity, cost, price, null,null,product);
            Inventory inventory1 = inventoryService.save(inventory);
        }
        product.setStock(product.getStock()+quantity);
        productService.update(productId,product);
        return productService.getAllProducts();
    }

    @Transactional
    @RequestMapping("/add-inventory-by-inventory")
    public List<Inventory> addInventoryByInventory(@RequestParam("inventoryId")String inventoryId, @RequestParam("quantity") int quantity){
        Inventory inventory=inventoryService.get(inventoryId);
        if(inventory!=null) {
            inventory.setQuantity(inventory.getQuantity() + quantity);
            Inventory inventory1 = inventoryService.update(inventory);
            Product product=inventory.getProduct();
            product.setStock(product.getStock()+quantity);
            productService.update(product.getId(), product);
        }


        return inventoryService.getAllInventory();
    }

    @Transactional
    @RequestMapping("/remove-inventory")
    public List<Inventory> removeInventory(@Param("inventoryId")String inventoryId, @Param("quantity") int quantity){
        Inventory inventory=inventoryService.get(inventoryId);
        if(inventory.getQuantity()-quantity>=0) {
                inventory.setQuantity(inventory.getQuantity()-quantity);
                Inventory inventory1=inventoryService.update(inventory);
                Product product = productService.get(inventory.getProduct().getId());
                product.setStock((product.getStock() - quantity) > 0 ? (product.getStock() - quantity) : 0);
                productService.update(product.getId(), product);
                return (product.getStock() - quantity) > 0 ? inventoryService.getAllInventory() : null;
            }

        return null;
    }

    @GetMapping("/get-product-by-id")
    public Product getProductById(@RequestParam("productId") String productId){
        return productService.get(productId);
    }

    @GetMapping("/get-inventory-by-id")
    public Inventory getInventoryById(@RequestParam("inventoryId") String inventoryId){
        Inventory inventory=inventoryService.get(inventoryId);
        return inventory;
    }

    @GetMapping("/search-product-by-name-packaging-description")
    public List<Inventory> getSearchInventory(@Param("term") String term){
        List<Inventory> inventories=inventoryService.searchInventoryForSale(term);
        return inventories;
    }


}
