package com.mana.limo.controller;

import com.mana.limo.domain.*;
import com.mana.limo.domain.enums.*;
import com.mana.limo.domain.enums.Currency;
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
    UserService userService;
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

    @Autowired
    InventoryService inventoryService;


    public  List<SaleItem> saleItems=new ArrayList<>();
    public  static Set<SaleItemDTO> saleItemDTOS=new HashSet<>();
    private boolean ok=true;
    boolean showMsg=false;
    boolean showMsgs=false;

    private String message="";
    private String messages="";
    @RequestMapping("sales-list")
    public String getSalesList(Model model,HttpServletRequest request){
        model.addAttribute("pageContext", request.getContextPath());
        List<String> privileges=userService.getCurrentUser().getUserRoles().stream().map(role->role.getPrivileges().stream().map(privilege -> privilege.getPrintName())).collect(Collectors.toList()).stream().map(stringStream -> stringStream.collect(Collectors.joining(","))).collect(Collectors.toList());
        model.addAttribute("user", userService.getCurrentUser());
        model.addAttribute("privileges",privileges );
        model.addAttribute("title", "Sales List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Sale List");
        return "sales/list";
    }

    @GetMapping("/sale-creation")
    public String createSale(Model model,@RequestParam(value = "saleId", required = false) String saleId, HttpServletRequest request){
        Sale sale=(saleId!=null)?saleService.get(saleId):null;
        saleItems=(sale!=null && sale.getSaleItems()!=null) ? sale.getSaleItems() : new ArrayList<>();
        saleItemDTOS=saleItems.stream().map(saleItem -> new SaleItemDTO(saleItem.getQuantity(), saleItem.getInventory())).collect(Collectors.toSet());
        model.addAttribute("command", sale==null?new Sale():sale);
        model.addAttribute("statuses", SaleStatus.values());
        List<String> privileges=userService.getCurrentUser().getUserRoles().stream().map(role->role.getPrivileges().stream().map(privilege -> privilege.getPrintName())).collect(Collectors.toList()).stream().map(stringStream -> stringStream.collect(Collectors.joining(","))).collect(Collectors.toList());
        model.addAttribute("user", userService.getCurrentUser());
        model.addAttribute("currencies", Currency.values());
        model.addAttribute("privileges",privileges );
        model.addAttribute("orgs", organizationService.getAllOrganizations());
        model.addAttribute("receiptNumber", paddNumber(saleId!=null && sale!=null && sale.getId()!=null?sale.getReceiptNumber():saleService.getAllSales().size()+""));
        model.addAttribute("bunits", businessUnitService.getAllBusinessUnits());
        model.addAttribute("customers", customerService.getAllCustomers());
        model.addAttribute("title", (sale==null)?"New Sale":"Edit::"+sale.getReceiptNumber());
        model.addAttribute("pageTitle", Constants.TITLE+" :: New Sale");
        return "sales/search-product";
    }

    @Transactional
    @PostMapping("/sale-creation")
    public String postSale(Model model, @ModelAttribute("item") @Valid Sale sale, BindingResult result){
        showMsgs=false;
        showMsg=false;
        model.addAttribute("msg", new Message("Sale saved successfully!", MsgType.success));
        List<String> privileges=userService.getCurrentUser().getUserRoles().stream().map(role->role.getPrivileges().stream().map(privilege -> privilege.getPrintName())).collect(Collectors.toList()).stream().map(stringStream -> stringStream.collect(Collectors.joining(","))).collect(Collectors.toList());
        model.addAttribute("user", userService.getCurrentUser());
        model.addAttribute("privileges",privileges );
        model.addAttribute("title", "Product List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Sales List");

        if(result.hasErrors() || (SaleController.saleItemDTOS.isEmpty() && this.saleItems.isEmpty())){
            model.addAttribute("command", sale==null?new Sale():sale);
            model.addAttribute("statuses", SaleStatus.values());
            model.addAttribute("user", userService.getCurrentUser());
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


        List<String> saleItemDTOIds=saleItemDTOS.stream().map(saleItemDTO -> saleItemDTO.getInventory().getId()).collect(Collectors.toList());
            saleItemService.getAllBySale(sale).stream().forEach(saleItem -> {
                if(!saleItemDTOIds.contains(saleItem.getInventory().getId())){
                    saleItemDTOIds.remove(saleItem);
                    saleItemService.remove(saleItem);
                }
            });


        if(sale.getReceiptNumber()==null|| sale.getReceiptNumber().isEmpty()){
            sale.setReceiptNumber(paddNumber(saleService.getAllSales().size()+""));
        }



        saleItemDTOS.forEach(saleItemDTO -> {
            if(saleItemDTO.getInventory().getQuantity()<saleItemDTO.getQuantity()){
                ok=false;
                showMsg=true;
                message+=" >>>>>>>>> Not enough stock for product: "+saleItemDTO.getInventory().getProduct().getName()+" "+saleItemDTO.getInventory().getProduct().getPackaging()+". Requested::"+saleItemDTO.getQuantity()+" but only "+saleItemDTO.getInventory().getQuantity()+" is available! #";
            }
        });

        if(ok) {

            saleItemService.RemoveAllBySale(sale);
            if(sale.getCustomer()==null && sale.getCustomerName()!=null){
                Customer c=new Customer(sale.getCustomerName());
                c.setType(ExternalType.INDIVIDUAL);
                c.setActive(Boolean.TRUE);
                c.setStatus(Status.ACTIVE);
                Customer customer1=customerService.Save(c);
                sale.setCustomer(customer1);
            }

            Sale sale1 = (sale.getId() == null || sale.getId().length() < 1) ? saleService.Save(sale) : saleService.update(sale);


            //save new SaleItems with reference to the saved sale, upodating the inventory to subtract sold items
            List<SaleItem> newSaleItems = saleItemDTOS.stream().
                    map(saleItemDTO -> {
                        Inventory inventory=inventoryService.get(saleItemDTO.getInventory().getId());
                        SaleItem s = new SaleItem(saleItemDTO.getQuantity(), inventory);
                        s.setSale(saleService.get(sale1.getId()));
                        SaleItem s1 = saleItemService.Save(s);
                        inventory.setQuantity(inventory.getQuantity()-s1.getQuantity());
                        Inventory inventory1=inventoryService.update(inventory);
                        return s1 != null ? s : new SaleItem();
                    }).filter(saleItem -> saleItem.getInventory() != null && saleItem.getInventory().getId() != null)
                    .collect(Collectors.toList());

            saleItemDTOS.forEach(saleItemDTO -> {
                if(saleItemDTO.getInventory().getProduct().getReOderLevel() >= saleItemDTO.getInventory().getQuantity()){
                    showMsgs=true;
                    messages+="* Please note product stock for:"+saleItemDTO.getInventory().getProduct().getName()+" "+saleItemDTO.getInventory().getProduct().getPackaging()+", is now in Reorder Status. Stock Quantity left is : "+(ok?(saleItemDTO.getInventory().getQuantity()-saleItemDTO.getQuantity()):saleItemDTO.getInventory().getQuantity())+" while reorder Level is : "+saleItemDTO.getInventory().getProduct().getReOderLevel()+"#";
                }
            });


        }else{
            saleItemDTOS.forEach(saleItemDTO -> {
                if(saleItemDTO.getInventory().getProduct().getReOderLevel() >= (saleItemDTO.getInventory().getQuantity())){
                    showMsgs=true;
                    messages+="Please note product stock for :"+saleItemDTO.getInventory().getProduct().getName()+" "+saleItemDTO.getInventory().getProduct().getPackaging()+", is now in Reorder Status. Stock Quantity left is : "+saleItemDTO.getInventory().getQuantity()+" while reorder Level is : "+saleItemDTO.getInventory().getProduct().getReOderLevel()+"#";
                }
            });
            model.addAttribute("command", sale==null?new Sale():sale);
            model.addAttribute("statuses", SaleStatus.values());
            model.addAttribute("user", userService.getCurrentUser());
            model.addAttribute("privileges",privileges );
            model.addAttribute("orgs", organizationService.getAllOrganizations());
            model.addAttribute("bunits", businessUnitService.getAllBusinessUnits());
            model.addAttribute("customers", customerService.getAllCustomers());
            model.addAttribute("title", (sale==null)?"New Sale":"Edit::"+sale.getReceiptNumber());
            model.addAttribute("receiptNumber", paddNumber(sale!=null && sale.getId()!=null?sale.getReceiptNumber():saleService.getAllSales().size()+""));
            model.addAttribute("pageTitle", Constants.TITLE+" :: New Sale");
            model.addAttribute("msg", new Message(message, MsgType.danger));
            model.addAttribute("msgs", new Message(messages, MsgType.warning));
            model.addAttribute("showMsg", !ok);
            model.addAttribute("showMsgs", showMsgs);
            return "sales/item";
        }

        model.addAttribute("msgs", (!messages.isEmpty())?new Message(messages, MsgType.warning):null);
        model.addAttribute("msg", (!message.isEmpty())?new Message(message, MsgType.danger):model.getAttribute("msg"));

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
