package com.mana.limo.controller.json;

import com.mana.limo.domain.Customer;
import com.mana.limo.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    CustomerService customerService;

    @GetMapping("/list")
    public List<Customer> getAllCustomers(){
        return customerService.getAllCustomers();
    }

    @GetMapping("/search-active")
    public ResponseEntity getActiveCustomers(@RequestParam("term") String term){
        List<Customer> customers=customerService.searchActiveCustomers(term);
        return new ResponseEntity(customers, HttpStatus.OK);
    }

    @GetMapping("/search-customer-by-name")
    public  Customer searchCustomerByName(@Param("name") String name){
        return customerService.searchCustomerByName(name);
    }

}
