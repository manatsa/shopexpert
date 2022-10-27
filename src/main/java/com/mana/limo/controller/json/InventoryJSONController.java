package com.mana.limo.controller.json;

import com.mana.limo.domain.Inventory;
import com.mana.limo.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author :: codemaster
 * created on :: 19/10/2022
 * Package Name :: com.mana.limo.controller
 */

@RestController
@RequestMapping("/inventory")
public class InventoryJSONController {

    @Autowired
    InventoryService inventoryService;

    @GetMapping("/list")
    public List<Inventory> getAllInventory(){
        return inventoryService.getAllInventory();
    }
}
