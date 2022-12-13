package com.mana.limo.controller.json;

import com.mana.limo.domain.Customer;
import com.mana.limo.service.CustomerService;
import com.mana.limo.util.StringUtils;
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
        String camelTerm=StringUtils.toCamelCase3(term);
        List<Customer> customers=customerService.searchActiveCustomers(camelTerm);
        return new ResponseEntity(customers, HttpStatus.OK);
    }

    @GetMapping("/search-customer-by-name")
    public  Customer searchCustomerByName(@Param("name") String name){
        String camelName= StringUtils.toCamelCase3(name);
        return customerService.searchCustomerByName(camelName);
    }

}
