package com.mana.limo.dto;

import com.mana.limo.domain.BusinessUnit;
import com.mana.limo.domain.Organization;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/**
 * @author :: codemaster
 * created on :: 14/10/2022
 * Package Name :: com.mana.limo.service
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class SearchDTO {

    private List<Organization> organizations;

    private List<BusinessUnit> businessUnits;

    private Date startDate;

    private Date endDate;


}
