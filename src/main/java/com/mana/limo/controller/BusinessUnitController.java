package com.mana.limo.controller;

import com.mana.limo.domain.BusinessUnit;
import com.mana.limo.domain.User;
import com.mana.limo.domain.enums.MsgType;
import com.mana.limo.domain.enums.Status;
import com.mana.limo.service.BusinessUnitService;
import com.mana.limo.service.OrganizationService;
import com.mana.limo.util.Constants;
import com.mana.limo.util.Message;
import com.mana.limo.validation.ProductValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author :: codemaster
 * created on :: 18/10/2022
 * Package Name :: com.mana.limo.controller
 */

@Controller
@RequestScope
@Validated
@Transactional
public class BusinessUnitController {

    @Autowired
    User user;
    @Autowired
    ProductValidation productValidation;

    @Autowired
    BusinessUnitService businessUnitService;

    @Autowired
    OrganizationService organizationService;

    @RequestMapping("units-list")
    public String getProductList(Model model,HttpServletRequest request){
        model.addAttribute("pageContext", request.getContextPath());
        List<String> privileges=user.getUserRoles().stream().map(role->role.getPrivileges().stream().map(privilege -> privilege.getPrintName())).collect(Collectors.toList()).stream().map(stringStream -> stringStream.collect(Collectors.joining(","))).collect(Collectors.toList());
        model.addAttribute("user", user);
        model.addAttribute("privileges",privileges );
        model.addAttribute("title", "BusinessUnits List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: BusinessUnits List");
        return "units/list";
    }

    @GetMapping("/units-creation")
    public String createProduct(Model model,@RequestParam(value = "bUnitId", required = false) String bUnitId, HttpServletRequest request){
        BusinessUnit businessUnit=(bUnitId!=null)?businessUnitService.get(bUnitId):null;
        model.addAttribute("command", businessUnit==null?new BusinessUnit():businessUnit);
        model.addAttribute("statuses", Status.values());
        List<String> privileges=user.getUserRoles().stream().map(role->role.getPrivileges().stream().map(privilege -> privilege.getPrintName())).collect(Collectors.toList()).stream().map(stringStream -> stringStream.collect(Collectors.joining(","))).collect(Collectors.toList());
        model.addAttribute("user", user);
        model.addAttribute("privileges",privileges );
        model.addAttribute("orgs", organizationService.getAllOrganizations());
        model.addAttribute("title", "BusinessUnits List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: BusinessUnits List");
        return "units/item";
    }

    @PostMapping("/units-creation")
    public String makeProduct(Model model, @ModelAttribute("item") @Valid BusinessUnit businessUnit, BindingResult result){
        model.addAttribute("msg", new Message("Business unit saved successfully!", MsgType.success));
        List<String> privileges=user.getUserRoles().stream().map(role->role.getPrivileges().stream().map(privilege -> privilege.getPrintName())).collect(Collectors.toList()).stream().map(stringStream -> stringStream.collect(Collectors.joining(","))).collect(Collectors.toList());
        model.addAttribute("user", user);
        model.addAttribute("privileges",privileges );
        model.addAttribute("title", "B/Units List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: B/Units List");
        if(result.hasErrors()){
            model.addAttribute("command", businessUnit);
            model.addAttribute("statuses", Status.values());
            model.addAttribute("user", user);
            model.addAttribute("privileges",privileges );
            model.addAttribute("title", "B/Units List");
            model.addAttribute("pageTitle", Constants.TITLE+" :: B/Units List");
            model.addAttribute("msg", new Message(result.getAllErrors().stream().map(error->error.toString()).collect(Collectors.joining("\n")), MsgType.danger));
            return "units/item";
        }
        BusinessUnit businessUnit1=(businessUnit.getId()==null || businessUnit.getId().length()<1)?businessUnitService.Save(businessUnit):businessUnitService.update(businessUnit);
        return "units/list";
    }
}
