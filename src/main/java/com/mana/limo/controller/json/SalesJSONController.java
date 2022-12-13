package com.mana.limo.controller.json;

import com.mana.limo.controller.SaleController;
import com.mana.limo.domain.*;
import com.mana.limo.dto.SaleItemDTO;
import com.mana.limo.service.InventoryService;
import com.mana.limo.service.ProductService;
import com.mana.limo.service.SaleItemService;
import com.mana.limo.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author :: codemaster
 * created on :: 19/10/2022
 * Package Name :: com.mana.limo.controller
 */

@RestController
@RequestMapping("/sales")
public class SalesJSONController {

    @Autowired
    SaleService saleService;

    @Autowired
    ProductService productService;

    @Autowired
    SaleItemService saleItemService;

    @Autowired
    InventoryService inventoryService;

    @GetMapping("/list")
    public List<Sale> getAllProducts(){
        return saleService.getAllActiveSales().stream().map(sale -> {
            sale.setSaleItems(saleItemService.getAllBySale(sale));
            return sale;
        }).collect(Collectors.toList());
    }

    @RequestMapping("/get-sale-by-id")
    public Sale getCustomerById(@RequestParam(value = "id") String id){
        return saleService.get(id);
    }

    @RequestMapping("/add-sale-item-to-sale")
    public List<SaleItemDTO> addSaleItem(@RequestParam("inventoryId") String inventoryId, @RequestParam("quantity") int quantity){

//        System.err.println("Inventory ID::"+inventoryId);
        Optional<SaleItemDTO> saleItemDTOOptional=SaleController.saleItemDTOS.stream().filter(saleItemDTO1 -> saleItemDTO1.getInventory().getId().equals(inventoryId)).findFirst();
        SaleItemDTO saleItemDTO=saleItemDTOOptional!=null && saleItemDTOOptional.isPresent()?saleItemDTOOptional.get():null;
        SaleController.saleItemDTOS=SaleController.saleItemDTOS.stream().filter(saleItemDTO1 -> !saleItemDTO1.getInventory().getId().equals(inventoryId)).collect(Collectors.toSet());

        //search if inventory item is already picked and in the list of items to be bought
        if(saleItemDTO!=null){
            saleItemDTO.setQuantity(saleItemDTO.getQuantity()+quantity);
            SaleController.saleItemDTOS.add(saleItemDTO);

        }else {
//      to add new inventory item to the list of items to be bought
            Inventory inventory=inventoryService.get(inventoryId);
            SaleItemDTO saleDTO=new SaleItemDTO(quantity, inventory);
            SaleController.saleItemDTOS.add(saleDTO);
        }
        //convert Set toList
        List<SaleItemDTO> saleItemDTOList= SaleController.saleItemDTOS.stream().collect(Collectors.toList());
        System.err.println(saleItemDTOList);
        return saleItemDTOList;
    }

    @RequestMapping("/remove-sale-item-to-sale")
    public List<SaleItemDTO> removeSaleItem(@RequestParam("inventoryId") String inventoryId, @RequestParam("quantity") int quantity){
        Optional<SaleItemDTO> saleItemDTOOptional=SaleController.saleItemDTOS.stream().filter(saleItemDTO1 -> saleItemDTO1.getInventory().getId().equals(inventoryId)).findFirst();
        SaleItemDTO saleItemDTO=saleItemDTOOptional!=null && saleItemDTOOptional.isPresent()?saleItemDTOOptional.get():null;
        SaleController.saleItemDTOS=SaleController.saleItemDTOS.stream().filter(saleItemDTO1 -> !saleItemDTO1.getInventory().getId().equals(inventoryId)).collect(Collectors.toSet());
        if(saleItemDTO!=null && saleItemDTO.getQuantity()>quantity){
            saleItemDTO.setQuantity(saleItemDTO.getQuantity()-quantity);
            SaleController.saleItemDTOS.add(saleItemDTO);
        }
        return SaleController.saleItemDTOS.stream().collect(Collectors.toList());
    }


    @RequestMapping("/get-sale-item-to-sale")
    public List<SaleItemDTO> getSaleItem(){
        List<SaleItemDTO> items=SaleController.saleItemDTOS.stream().collect(Collectors.toList());
        return items;
    }

}

