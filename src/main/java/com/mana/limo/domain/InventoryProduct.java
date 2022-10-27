package com.mana.limo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

/**
 * @author :: codemaster
 * created on :: 20/10/2022
 * Package Name :: com.mana.limo.domain
 */

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryProduct extends  BaseEntity{
    @OneToOne
    private Product product;
    private double Quantity;
}
