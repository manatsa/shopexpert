package com.mana.limo.controller;

import com.mana.limo.domain.Organization;
import com.mana.limo.domain.Product;
import com.mana.limo.domain.User;
import com.mana.limo.domain.enums.MsgType;
import com.mana.limo.domain.enums.ProductType;
import com.mana.limo.domain.enums.Status;
import com.mana.limo.service.OrganizationService;
import com.mana.limo.service.ProductService;
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
public class OrganizationController {

    @Autowired
    User user;
    @Autowired
    ProductValidation productValidation;

    @Autowired
    OrganizationService organizationService;

    @RequestMapping("orgs-list")
    public String getProductList(Model model,HttpServletRequest request){
        model.addAttribute("pageContext", request.getContextPath());
        model.addAttribute("user", user);
        model.addAttribute("title", "Organizations List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Organizations List");
        return "orgs/list";
    }

    @GetMapping("/orgs-creation")
    public String createProduct(Model model,@RequestParam(value = "productId", required = false) String productId, HttpServletRequest request){
        Organization organization=(productId!=null)?organizationService.get(productId):null;
        model.addAttribute("command", organization==null?new Organization():organization);
        model.addAttribute("statuses", Status.values());
        model.addAttribute("user", user);
        model.addAttribute("title", "Organizations List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Organizations List");
        return "orgs/item";
    }

    @PostMapping("/orgs-creation")
    public String makeProduct(Model model, @ModelAttribute("item") @Valid Organization organization, BindingResult result){
        model.addAttribute("msg", new Message("Organization saved successfully!", MsgType.success));
        model.addAttribute("user", user);
        model.addAttribute("title", "Organization List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Organization List");
        if(result.hasErrors()){
            model.addAttribute("command", organization);
            model.addAttribute("statuses", Status.values());
            model.addAttribute("user", user);
            model.addAttribute("title", "Organizations List");
            model.addAttribute("pageTitle", Constants.TITLE+" :: Organizations List");
            model.addAttribute("msg", new Message(result.getAllErrors().stream().map(error->error.toString()).collect(Collectors.joining("\n")), MsgType.danger));
            return "orgs/item";
        }
        Organization organization1=(organization.getId()==null || organization.getId().length()<1)?organizationService.Save(organization):organizationService.update(organization);
        return "orgs/list";
    }
}
