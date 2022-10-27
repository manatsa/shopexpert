package com.mana.limo.controller.json;

import com.mana.limo.domain.Product;
import com.mana.limo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * @author :: codemaster
 * created on :: 19/10/2022
 * Package Name :: com.mana.limo.controller
 */

@RestController
@RequestMapping("/products")
public class ProductJSONController {

    @Autowired
    ProductService productService;

    @GetMapping("/list")
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

}
