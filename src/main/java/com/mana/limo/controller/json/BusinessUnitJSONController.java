package com.mana.limo.controller.json;

import com.mana.limo.domain.BusinessUnit;
import com.mana.limo.domain.Organization;
import com.mana.limo.service.BusinessUnitService;
import com.mana.limo.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author :: codemaster
 * created on :: 19/10/2022
 * Package Name :: com.mana.limo.controller
 */

@RestController
@RequestMapping("/units")
public class BusinessUnitJSONController {

    @Autowired
    BusinessUnitService businessUnitService;

    @GetMapping("/list")
    public List<BusinessUnit> getAllBusinessUnits(){
        return businessUnitService.getAllBusinessUnits();
    }

    @GetMapping("/list-by-organization")
    public List<BusinessUnit> getAllBusinessUnitsByOrganization(@RequestParam("org") Organization organization){

        return businessUnitService.getByOrganization(organization);
    }

}
