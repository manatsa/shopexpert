package com.mana.limo.controller;

import com.mana.limo.domain.Supplier;
import com.mana.limo.domain.User;
import com.mana.limo.domain.enums.ExternalType;
import com.mana.limo.domain.enums.MsgType;
import com.mana.limo.domain.enums.Status;
import com.mana.limo.service.SupplierService;
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
public class SupplierController {

    @Autowired
    User user;
    @Autowired
    ProductValidation productValidation;

    @Autowired
    SupplierService supplierService;

    @RequestMapping("suppliers-list")
    public String getProductList(Model model,HttpServletRequest request){
        model.addAttribute("pageContext", request.getContextPath());
        model.addAttribute("user", user);
        model.addAttribute("title", "Suppliers List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Suppliers List");
        return "suppliers/list";
    }

    @GetMapping("/suppliers-creation")
    public String createProduct(Model model,@RequestParam(value = "supplierId", required = false) String supplierId, HttpServletRequest request){
        Supplier supplier=(supplierId!=null)?supplierService.get(supplierId):null;
        model.addAttribute("command", supplier==null?new Supplier():supplier);
        model.addAttribute("statuses", Status.values());
        model.addAttribute("types", ExternalType.values());
        model.addAttribute("user", user);
        model.addAttribute("title", "Suppliers List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Suppliers List");
        return "suppliers/item";
    }

    @PostMapping("/suppliers-creation")
    public String makeProduct(Model model, @ModelAttribute("item") @Valid Supplier supplier, BindingResult result){
        model.addAttribute("msg", new Message("Supplier saved successfully!", MsgType.success));
        model.addAttribute("user", user);
        model.addAttribute("title", "Supplier List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Supplier List");
        if(result.hasErrors()){
            model.addAttribute("command", supplier);
            model.addAttribute("statuses", Status.values());
            model.addAttribute("user", user);
            model.addAttribute("title", "Suppliers List");
            model.addAttribute("pageTitle", Constants.TITLE+" :: Suppliers List");
            model.addAttribute("msg", new Message(result.getAllErrors().stream().map(error->error.toString()).collect(Collectors.joining("\n")), MsgType.danger));
            return "suppliers/item";
        }
        Supplier supplier1=(supplier.getId()==null || supplier.getId().length()<1)?supplierService.Save(supplier):supplierService.update(supplier);
        return "suppliers/list";
    }
}
