package com.mana.limo.controller.json;

import com.mana.limo.domain.Supplier;
import com.mana.limo.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/suppliers")
public class SupplierJSONController {

    @Autowired
    SupplierService supplierService;

    @GetMapping("/list")
    public List<Supplier> getAllSuppliers(){
        return supplierService.getAllSuppliers();
    }

}
