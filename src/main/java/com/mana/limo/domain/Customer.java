package com.mana.limo.domain;

import com.mana.limo.domain.enums.ExternalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;

/**
 * @author :: codemaster
 * created on :: 18/10/2022
 * Package Name :: com.mana.limo.domain
 */

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer extends BaseEntity{

    @Column(nullable = false, unique = true)
    private String name;

    private String address;

    private String email;

    private String phone;
    @Enumerated
    private ExternalType type;

    public Customer(String name){
        this.name=name;
    }

}
