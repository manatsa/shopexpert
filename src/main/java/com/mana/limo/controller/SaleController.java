package com.mana.limo.controller;

import com.mana.limo.domain.Product;
import com.mana.limo.domain.Sale;
import com.mana.limo.domain.SaleItem;
import com.mana.limo.domain.User;
import com.mana.limo.domain.enums.MsgType;
import com.mana.limo.domain.enums.ProductType;
import com.mana.limo.domain.enums.SaleStatus;
import com.mana.limo.domain.enums.Status;
import com.mana.limo.dto.SaleItemDTO;
import com.mana.limo.service.*;
import com.mana.limo.util.Constants;
import com.mana.limo.util.Message;
import com.mana.limo.validation.ProductValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;
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

    @Autowired
    CustomerService customerService;

    public  List<SaleItem> saleItems=new ArrayList<>();
    public  static Set<SaleItemDTO> saleItemDTOS=new HashSet<>();
    private boolean ok=true;

    private String message="";
    private String messages="";
    @RequestMapping("sales-list")
    public String getProductList(Model model,HttpServletRequest request){
        model.addAttribute("pageContext", request.getContextPath());
        List<String> privileges=user.getUserRoles().stream().map(role->role.getPrivileges().stream().map(privilege -> privilege.getPrintName())).collect(Collectors.toList()).stream().map(stringStream -> stringStream.collect(Collectors.joining(","))).collect(Collectors.toList());
        model.addAttribute("user", user);
        model.addAttribute("privileges",privileges );
        model.addAttribute("title", "Sales List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Sale List");
        return "sales/list";
    }

    @GetMapping("/sale-creation")
    public String createProduct(Model model,@RequestParam(value = "saleId", required = false) String saleId, HttpServletRequest request){
        Sale sale=(saleId!=null)?saleService.get(saleId):null;
        saleItems=(sale!=null && sale.getSaleItems()!=null) ? sale.getSaleItems() : new ArrayList<>();
        saleItemDTOS=saleItems.stream().map(saleItem -> new SaleItemDTO(saleItem.getQuantity(), saleItem.getProduct())).collect(Collectors.toSet());
        model.addAttribute("command", sale==null?new Sale():sale);
        model.addAttribute("statuses", SaleStatus.values());
        List<String> privileges=user.getUserRoles().stream().map(role->role.getPrivileges().stream().map(privilege -> privilege.getPrintName())).collect(Collectors.toList()).stream().map(stringStream -> stringStream.collect(Collectors.joining(","))).collect(Collectors.toList());
        model.addAttribute("user", user);
        model.addAttribute("privileges",privileges );
        model.addAttribute("orgs", organizationService.getAllOrganizations());
        model.addAttribute("receiptNumber", paddNumber(saleId!=null && sale!=null && sale.getId()!=null?sale.getReceiptNumber():saleService.getAllSales().size()+""));
        model.addAttribute("bunits", businessUnitService.getAllBusinessUnits());
        model.addAttribute("customers", customerService.getAllCustomers());
        model.addAttribute("title", (sale==null)?"New Sale":"Edit::"+sale.getReceiptNumber());
        model.addAttribute("pageTitle", Constants.TITLE+" :: New Sale");
        return "sales/item";
    }

    @Transactional
    @PostMapping("/sale-creation")
    public String makeProduct(Model model, @ModelAttribute("item") @Valid Sale sale, BindingResult result){
        model.addAttribute("msg", new Message("Sale saved successfully!", MsgType.success));
        List<String> privileges=user.getUserRoles().stream().map(role->role.getPrivileges().stream().map(privilege -> privilege.getPrintName())).collect(Collectors.toList()).stream().map(stringStream -> stringStream.collect(Collectors.joining(","))).collect(Collectors.toList());
        model.addAttribute("user", user);
        model.addAttribute("privileges",privileges );
        model.addAttribute("title", "Product List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Sales List");

        if(result.hasErrors() || (SaleController.saleItemDTOS.isEmpty() && this.saleItems.isEmpty())){
            model.addAttribute("command", sale==null?new Sale():sale);
            model.addAttribute("statuses", SaleStatus.values());
            model.addAttribute("user", user);
            model.addAttribute("privileges",privileges );
            model.addAttribute("orgs", organizationService.getAllOrganizations());
            model.addAttribute("bunits", businessUnitService.getAllBusinessUnits());
            model.addAttribute("customers", customerService.getAllCustomers());
            model.addAttribute("title", (sale==null)?"New Sale":"Edit::"+sale.getReceiptNumber());
            model.addAttribute("receiptNumber", paddNumber(sale!=null && sale.getId()!=null?sale.getReceiptNumber():saleService.getAllSales().size()+""));
            model.addAttribute("pageTitle", Constants.TITLE+" :: New Sale");
            model.addAttribute("msg", (result.hasErrors())?new Message(result.getFieldErrors().stream().map(error->error.getField()+"::"+error.getDefaultMessage()).collect(Collectors.joining("\n")), MsgType.danger):
                    new Message("At least one product is expected in a sale!", MsgType.danger));
            return "sales/item";
        }

        List<String> saleItemDTOIds=saleItemDTOS.stream().map(saleItemDTO -> saleItemDTO.getProduct().getId()).collect(Collectors.toList());
            saleItemService.getAllBySale(sale).stream().forEach(saleItem -> {
                if(!saleItemDTOIds.contains(saleItem.getProduct().getId())){
                    saleItemDTOIds.remove(saleItem);
                    saleItemService.remove(saleItem);
                }
            });


        if(sale.getReceiptNumber()==null|| sale.getReceiptNumber().isEmpty()){
            sale.setReceiptNumber(paddNumber(saleService.getAllSales().size()+""));
        }



        saleItemDTOS.forEach(saleItemDTO -> {
            if(saleItemDTO.getProduct().getStock()<saleItemDTO.getQuantity()){
                ok=false;
                message+=" >>>>>>>>> Not enough stock for product: "+saleItemDTO.getProduct().getName()+" "+saleItemDTO.getProduct().getPackaging()+". Requested::"+saleItemDTO.getQuantity()+" but only "+saleItemDTO.getProduct().getStock()+" is available! #";
            }
        });

        if(ok) {
            Sale sale1 = (sale.getId() == null || sale.getId().length() < 1) ? saleService.Save(sale) : saleService.update(sale);

            saleItemService.RemoveAllBySale(sale);
            List<SaleItem> newSaleItems = saleItemDTOS.stream().
                    map(saleItemDTO -> {
                        SaleItem s = new SaleItem(saleItemDTO.getQuantity(), saleItemDTO.getProduct());
                        s.setSale(saleService.get(sale1.getId()));
                        SaleItem s1 = saleItemService.Save(s);
                        return s1 != null ? s : new SaleItem();
                    }).filter(saleItem -> saleItem.getProduct() != null && saleItem.getProduct().getId() != null)
                    .collect(Collectors.toList());

            saleItemDTOS.forEach(saleItemDTO -> {
                if(saleItemDTO.getProduct().getReOderLevel() >= (saleItemDTO.getProduct().getStock()-saleItemDTO.getQuantity())){
                    messages+="Please note product stock for:"+saleItemDTO.getProduct().getName()+" "+saleItemDTO.getProduct().getPackaging()+", is now below Reorder level. Stock Quantity left is : "+(ok?(saleItemDTO.getProduct().getStock()-saleItemDTO.getQuantity()):saleItemDTO.getProduct().getStock())+" while reorder Level is : "+saleItemDTO.getProduct().getReOderLevel()+"#";
                }
            });


        }else{
            saleItemDTOS.forEach(saleItemDTO -> {
                if(saleItemDTO.getProduct().getReOderLevel() >= (saleItemDTO.getProduct().getStock()-saleItemDTO.getQuantity())){
                    messages+="Please note product stock for :"+saleItemDTO.getProduct().getName()+" "+saleItemDTO.getProduct().getPackaging()+", is now below Reorder level. Stock Quantity left is : "+saleItemDTO.getProduct().getStock()+" while reorder Level is : "+saleItemDTO.getProduct().getReOderLevel()+"#";
                }
            });
            model.addAttribute("command", sale==null?new Sale():sale);
            model.addAttribute("statuses", SaleStatus.values());
            model.addAttribute("user", user);
            model.addAttribute("privileges",privileges );
            model.addAttribute("orgs", organizationService.getAllOrganizations());
            model.addAttribute("bunits", businessUnitService.getAllBusinessUnits());
            model.addAttribute("customers", customerService.getAllCustomers());
            model.addAttribute("title", (sale==null)?"New Sale":"Edit::"+sale.getReceiptNumber());
            model.addAttribute("receiptNumber", paddNumber(sale!=null && sale.getId()!=null?sale.getReceiptNumber():saleService.getAllSales().size()+""));
            model.addAttribute("pageTitle", Constants.TITLE+" :: New Sale");
            model.addAttribute("msg", new Message(message, MsgType.danger));
            model.addAttribute("msgs", new Message(messages, MsgType.warning));
            return "sales/item";
        }

        model.addAttribute("msgs", new Message(messages, MsgType.warning));

        return "sales/list";
    }




    private String paddNumber(String number){
        String result="";
        int size=number.toString().length();
        for(int n=0; n<(10-size); n++){
            result+="0";
        }
        result+=number;
        return result;
    }

}
