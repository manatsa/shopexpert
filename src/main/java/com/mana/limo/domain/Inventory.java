package com.mana.limo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

/**
 * @author :: codemaster
 * created on :: 19/10/2022
 * Package Name :: com.mana.limo.domain
 */

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inventory extends  BaseEntity{

    private String description;

    private Integer quantity;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "receiver_id")
    private User receiver;

    @ManyToOne(targetEntity = InventoryProduct.class, fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "inventory_product_id")
    private InventoryProduct inventoryProduct;


}
