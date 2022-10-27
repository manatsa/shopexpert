package com.mana.limo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * @author :: codemaster
 * created on :: 14/10/2022
 * Package Name :: com.mana.limo.domain
 */

@Entity
@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class BusinessUnit extends BaseEntity {

    private String name;
    private String address;
    private String phone;
    @Column(nullable = true)
    private String email;
    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;

}
