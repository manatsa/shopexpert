package com.mana.limo.controller;

import com.mana.limo.domain.Inventory;
import com.mana.limo.domain.Product;
import com.mana.limo.domain.User;
import com.mana.limo.domain.enums.MsgType;
import com.mana.limo.domain.enums.ProductType;
import com.mana.limo.domain.enums.Status;
import com.mana.limo.service.ProductService;
import com.mana.limo.util.Constants;
import com.mana.limo.util.Message;
import com.mana.limo.validation.ProductValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
//@RequestMapping("/products")
public class InventoryController {

    @Autowired
    User user;
    @Autowired
    ProductValidation productValidation;

    @Autowired
    ProductService productService;

    @RequestMapping("inventory-list")
    public String getProductList(Model model,HttpServletRequest request){
        model.addAttribute("pageContext", request.getContextPath());
        model.addAttribute("user", user);
        model.addAttribute("title", "Inventory");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Inventory List Items");
        return "inventory/list";
    }

    @GetMapping("/inventory-creation")
    public String createProduct(Model model, @RequestParam(value = "inventoryId", required = false) Inventory inventory, HttpServletRequest request){
        model.addAttribute("command", inventory==null?new Inventory():inventory);
        model.addAttribute("user", user);
        model.addAttribute("products", productService.getAllProducts());
        model.addAttribute("title", (inventory==null)?"New Product Line":"Edit::"+inventory.getDescription());
        model.addAttribute("pageTitle", Constants.TITLE+" :: New Inventory Item");
        return "inventory/item";
    }

    @PostMapping("/inventory-creation")
    public String makeProduct(Model model, @ModelAttribute("item") @Valid Product product, BindingResult result){
        model.addAttribute("msg", new Message("Product saved successfully!", MsgType.success));
        model.addAttribute("user", user);
        model.addAttribute("title", "Product List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Product List");
        productValidation.validate(product, result);
        if(result.hasErrors()){
            model.addAttribute("command", product);
            model.addAttribute("productTypes", ProductType.values());
            model.addAttribute("statuses", Status.values());
            model.addAttribute("user", user);
            model.addAttribute("title", "New Inventory");
            model.addAttribute("pageTitle", Constants.TITLE+" :: New Product Line");
            model.addAttribute("msg", new Message(result.getAllErrors().stream().map(error->error.toString()).collect(Collectors.joining("\n")), MsgType.danger));
            return "inventory/item";
        }
        /*Product product1=productService.Save(product);
        System.err.println(product1);*/
        return "inventory/list";
    }
}
