package com.mana.limo.controller;

import com.mana.limo.domain.Product;
import com.mana.limo.domain.Sale;
import com.mana.limo.domain.SaleItem;
import com.mana.limo.domain.User;
import com.mana.limo.domain.enums.MsgType;
import com.mana.limo.domain.enums.ProductType;
import com.mana.limo.domain.enums.SaleStatus;
import com.mana.limo.domain.enums.Status;
import com.mana.limo.service.*;
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
import java.util.ArrayList;
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
public class SaleController {

    @Autowired
    User user;
    @Autowired
    ProductService productService;

    @Autowired
    SaleItemService saleItemService;

    @Autowired
    SaleService saleService;

    @Autowired
    OrganizationService organizationService;

    @Autowired
    BusinessUnitService businessUnitService;

    public static List<SaleItem> saleItems=new ArrayList<>();

    @RequestMapping("sales-list")
    public String getProductList(Model model,HttpServletRequest request){
        model.addAttribute("pageContext", request.getContextPath());
        model.addAttribute("user", user);
        model.addAttribute("title", "Sales List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Sale List");
        return "sales/list";
    }

    @GetMapping("/sale-creation")
    public String createProduct(Model model,@RequestParam(value = "saleId", required = false) String saleId, HttpServletRequest request){
        Sale sale=(saleId!=null)?saleService.get(saleId):null;
        saleItems=(sale!=null && sale.getSaleItems()!=null && !sale.getSaleItems().isEmpty()) ? sale.getSaleItems() : new ArrayList<>();
        model.addAttribute("command", sale==null?new Sale():sale);
        model.addAttribute("statuses", SaleStatus.values());
        model.addAttribute("user", user);
        model.addAttribute("orgs", organizationService.getAllOrganizations());
        model.addAttribute("bunits", businessUnitService.getAllBusinessUnits());
        model.addAttribute("title", (sale==null)?"New Sale":"Edit::"+sale.getReceiptNumber());
        model.addAttribute("pageTitle", Constants.TITLE+" :: New Sale");
        return "sales/item";
    }

    @PostMapping("/sale-creation")
    public String makeProduct(Model model, @ModelAttribute("item") @Valid Sale sale, BindingResult result){
        model.addAttribute("msg", new Message("Sale saved successfully!", MsgType.success));
        model.addAttribute("user", user);
        model.addAttribute("title", "Product List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Sales List");
//        productValidation.validate(product, result);
        if(result.hasErrors() || SaleController.saleItems.isEmpty()){
            model.addAttribute("command", sale==null?new Sale():sale);
            model.addAttribute("statuses", SaleStatus.values());
            model.addAttribute("user", user);
            model.addAttribute("orgs", organizationService.getAllOrganizations());
            model.addAttribute("bunits", businessUnitService.getAllBusinessUnits());
            model.addAttribute("title", (sale==null)?"New Sale":"Edit::"+sale.getReceiptNumber());
            model.addAttribute("pageTitle", Constants.TITLE+" :: New Sale");
            model.addAttribute("msg", (result.hasErrors())?new Message(result.getFieldErrors().stream().map(error->error.getField()+"::"+error.getDefaultMessage()).collect(Collectors.joining("\n")), MsgType.danger):
                    new Message("At least one product is expected in a sale!", MsgType.danger));
            return "sales/item";
        }
        sale.setSaleItems(saleItems);
        Sale sale1=(sale.getId()==null || sale.getId().length()<1)?saleService.Save(sale):saleService.update(sale);
        return "sales/list";
    }

}
