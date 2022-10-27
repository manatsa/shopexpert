package com.mana.limo.controller.json;

import com.mana.limo.controller.SaleController;
import com.mana.limo.domain.Product;
import com.mana.limo.domain.Sale;
import com.mana.limo.domain.SaleItem;
import com.mana.limo.service.ProductService;
import com.mana.limo.service.SaleItemService;
import com.mana.limo.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
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

    @GetMapping("/list")
    public List<Sale> getAllProducts(){
        return saleService.getAllSales();
    }

    @RequestMapping("/add-sale-item-to-sale")
    public List<SaleItem> addSaleItem(@RequestParam("productId") String productId, @RequestParam("quantity") int quantity){
        SaleItem saleIt=new SaleItem();
        saleIt.setProduct(productService.get(productId));
        saleIt.setQuantity(quantity);
        SaleItem saleItem=saleItemService.Save(saleIt);
        SaleController.saleItems.add(saleItem);
        System.err.println("added sale item ::"+saleItem.getId());
        return SaleController.saleItems;
    }

    @RequestMapping("/remove-sale-item-to-sale")
    public List<SaleItem> removeSaleItem(@RequestParam("itemId") String itemtId){
        SaleItem saleItem=saleItemService.get(itemtId);
        saleItemService.remove(saleItem);
        SaleController.saleItems=SaleController.saleItems.stream().filter(saleItem1 -> !saleItem1.getId().equals(saleItem.getId())).collect(Collectors.toList());
        System.err.println("removed sale item ::"+saleItem.getId()+"\nNOW::"+SaleController.saleItems);
        return SaleController.saleItems;
    }

}
