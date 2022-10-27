package com.mana.limo.domain;

import com.mana.limo.controller.SaleController;
import com.mana.limo.domain.enums.SaleStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * @author :: codemaster
 * created on :: 25/10/2022
 * Package Name :: com.mana.limo.domain
 */

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sale extends BaseEntity{

    @GeneratedValue(strategy = GenerationType.AUTO)
    private int receiptNumber;
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date saleDate= new Date();
    @Column(nullable = true)
    private int quantity;
    @Enumerated
    private SaleStatus saleStatus;
    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;
    @ManyToOne
    @JoinColumn(name = "business_unit_id")
    private BusinessUnit businessUnit;
    @Transient
    private int totalItems;
    @Transient
    private double totalPrice;

    @OneToMany
    @JoinTable(name = "sales",
            joinColumns = {
                    @JoinColumn(name = "sale_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "sale_item_id")
            }
    )
    private List<SaleItem> saleItems;

    private int getTotalItems(){
        return SaleController.saleItems.size();
    }

    private double getTotalPrice(){
        return SaleController.saleItems.isEmpty()?0:SaleController.saleItems.stream().map(saleItem -> saleItem.getQuantity()* saleItem.getProduct().getPrice()).reduce(Double::sum).get();
    }
}
