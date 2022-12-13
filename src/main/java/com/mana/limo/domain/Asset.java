package com.mana.limo.domain;

import com.mana.limo.domain.enums.AssetType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * @author :: codemaster
 * created on :: 20/11/2022
 * Package Name :: com.mana.limo.domain
 */

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Asset extends BaseEntity{

    private String name;
    private String description;
    private double initialValue;
    @Enumerated
    private AssetType assetType;
    private double depreciation;
    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;
    @ManyToOne
    @JoinColumn(name = "business_unit_id")
    private BusinessUnit businessUnit;

}
