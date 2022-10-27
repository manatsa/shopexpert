package com.mana.limo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mana.limo.domain.enums.ProductType;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.context.annotation.Lazy;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.lang.Nullable;

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
    @NumberFormat(style = NumberFormat.Style.CURRENCY)
    private double price;
    private int reOderLevel;
    private double stock;
    private String details;
    @ManyToOne(optional = true)
    @JoinColumn(name = "business_unit_id")
    private BusinessUnit businessUnit;

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



    @Override
    public boolean equals(BaseEntity entity){
        return this.getId().equals(entity.getId());
    }

}
