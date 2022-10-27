package com.mana.limo.controller.json;

import com.mana.limo.domain.Customer;
import com.mana.limo.service.CustomerService;
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
@RequestMapping("/customers")
public class CustomerJSONController {

    @Autowired
    CustomerService supplierService;

    @GetMapping("/list")
    public List<Customer> getAllCustomers(){
        return supplierService.getAllCustomers();
    }

}
