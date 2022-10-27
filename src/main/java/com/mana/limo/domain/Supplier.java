package com.mana.limo.domain;

import com.mana.limo.domain.enums.ExternalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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
public class Supplier extends BaseEntity{

    private String name;

    private String address;

    private String email;

    private String phone;
    @Enumerated
    private ExternalType type;

}
