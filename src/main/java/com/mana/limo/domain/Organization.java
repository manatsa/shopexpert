package com.mana.limo.domain;

import lombok.*;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Entity;

/**
 * @author :: codemaster
 * created on :: 14/10/2022
 * Package Name :: com.mana.limo.domain
 */

@Entity
@Data
@NoArgsConstructor
@ToString(callSuper = true)
@Transactional
public class Organization extends BaseEntity {

    private String name;

    public  Organization(String id){
        super(id);
    }

}
