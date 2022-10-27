package com.mana.limo.controller;

import com.mana.limo.domain.Customer;
import com.mana.limo.domain.User;
import com.mana.limo.domain.enums.ExternalType;
import com.mana.limo.domain.enums.MsgType;
import com.mana.limo.domain.enums.Status;
import com.mana.limo.service.CustomerService;
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
public class CustomerController {

    @Autowired
    User user;
    @Autowired
    ProductValidation productValidation;

    @Autowired
    CustomerService customerService;

    @RequestMapping("customers-list")
    public String getProductList(Model model,HttpServletRequest request){
        model.addAttribute("pageContext", request.getContextPath());
        model.addAttribute("user", user);
        model.addAttribute("title", "Customers List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Customers List");
        return "customers/list";
    }

    @GetMapping("/customers-creation")
    public String createProduct(Model model,@RequestParam(value = "customerId", required = false) String customerId, HttpServletRequest request){
        Customer customer=(customerId!=null)?customerService.get(customerId):null;
        model.addAttribute("command", customer==null?new Customer():customer);
        model.addAttribute("statuses", Status.values());
        model.addAttribute("types", ExternalType.values());
        model.addAttribute("user", user);
        model.addAttribute("title", "Customers List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Customers List");
        return "customers/item";
    }

    @PostMapping("/customers-creation")
    public String makeProduct(Model model, @ModelAttribute("item") @Valid Customer customer, BindingResult result){
        model.addAttribute("msg", new Message("Customer saved successfully!", MsgType.success));
        model.addAttribute("user", user);
        model.addAttribute("title", "Customer List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Customer List");
        if(result.hasErrors()){
            model.addAttribute("command", customer);
            model.addAttribute("statuses", Status.values());
            model.addAttribute("user", user);
            model.addAttribute("title", "Customers List");
            model.addAttribute("pageTitle", Constants.TITLE+" :: Customers List");
            model.addAttribute("msg", new Message(result.getAllErrors().stream().map(error->error.toString()).collect(Collectors.joining("\n")), MsgType.danger));
            return "customers/item";
        }
        Customer customer1=(customer.getId()==null || customer.getId().length()<1)?customerService.Save(customer):customerService.update(customer);
        return "customers/list";
    }
}
