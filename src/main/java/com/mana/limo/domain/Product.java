package com.mana.limo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mana.limo.domain.enums.ProductType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.NumberFormat;

import javax.persistence.*;
import java.util.Set;

/**
 * @author :: codemaster
 * created on :: 18/10/2022
 * Package Name :: com.mana.limo.domain
 */

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class Product extends BaseEntity{


    private String name;
    private String description;
    private ProductType productType;
    private String packaging;
    @Column(nullable = true)
    private String code;
    @NumberFormat(style = NumberFormat.Style.CURRENCY)
    private double price;
    @NumberFormat(style = NumberFormat.Style.CURRENCY)
    private double cost;
    private int reOderLevel;
    private double stock=0;
    private String details;
    @ManyToOne(optional = false)
    @JoinColumn(name = "organization_id")
    private Organization organization;
    @ManyToOne(optional = false)
    @JoinColumn(name = "business_unit_id")
    private BusinessUnit businessUnit;
    @Transient
    @JsonProperty("printName")
    public String printName;

    public Product(String id){
        super(id);
    }

    @JsonIgnore
    @ManyToMany(targetEntity = Supplier.class)
            @JoinTable( name = "product_supplier",
                    joinColumns = {
                        @JoinColumn(name = "product_id")
                    },inverseJoinColumns = {
                        @JoinColumn(name = "supplier_id")
                    }
            )
    Set<Supplier> suppliers;


    @JsonProperty("printName")
    public String getPrintName() {
        return this.getName()+" - "+this.getDescription()+" - "+this.getPackaging();
    }

    @Override
    public boolean equals(BaseEntity entity){
        return this.getId().equals(entity.getId());
    }

}
