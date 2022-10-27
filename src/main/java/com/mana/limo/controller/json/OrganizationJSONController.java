package com.mana.limo.controller.json;

import com.mana.limo.domain.Organization;
import com.mana.limo.domain.Product;
import com.mana.limo.service.OrganizationService;
import com.mana.limo.service.ProductService;
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
@RequestMapping("/organizations")
public class OrganizationJSONController {

    @Autowired
    OrganizationService organizationService;

    @GetMapping("/list")
    public List<Organization> getAllOrganizations(){
        return organizationService.getAllOrganizations();
    }

}
