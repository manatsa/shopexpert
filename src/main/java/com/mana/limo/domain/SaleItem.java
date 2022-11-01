package com.mana.limo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author :: codemaster
 * created on :: 25/10/2022
 * Package Name :: com.mana.limo.domain
 */

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleItem implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int quantity;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    @Transient
    private String printName;
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "sale_id", nullable = false)
    @JsonIgnore
    private  Sale sale;

    public SaleItem(int quantity, Product product){
        this.quantity=quantity;
        this.product=product;
    }

    public String getPrintName() {
        if(product==null){
            return "";
        }
        return product.getDescription()+"-"+product.getName()+"-"+product.getPackaging();
    }
}
