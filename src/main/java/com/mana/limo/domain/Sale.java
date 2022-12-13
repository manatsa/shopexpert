package com.mana.limo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mana.limo.controller.SaleController;
import com.mana.limo.domain.enums.Currency;
import com.mana.limo.domain.enums.SaleStatus;
import com.mana.limo.dto.SaleItemDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
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
@ToString(callSuper = true)
public class Sale extends BaseEntity{
    @Column(unique = true)
    private String receiptNumber;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date saleDate;
    @Column(nullable = true)
    private int quantity;
    @Enumerated
    private SaleStatus saleStatus;
    @Column(nullable = true)
    @Enumerated
    private Currency currency;
    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;
    @ManyToOne
    @JoinColumn(name = "business_unit_id")
    private BusinessUnit businessUnit;
    @ManyToOne(optional = true, cascade = CascadeType.MERGE)
    @JoinColumn(name="customer_id")
    private Customer customer;
    @Transient
    private int totalItems;
    @Transient
    private double totalPrice;
    @Transient
    private String customerName;


    @OneToMany(mappedBy = "sale", fetch = FetchType.EAGER)
    private List<SaleItem> saleItems;




}
