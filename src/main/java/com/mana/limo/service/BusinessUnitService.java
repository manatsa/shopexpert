package com.mana.limo.service;

import com.mana.limo.domain.BusinessUnit;
import com.mana.limo.domain.Organization;

import java.util.List;

public interface BusinessUnitService {

    public List<BusinessUnit> getAllBusinessUnits();

    public BusinessUnit Save(BusinessUnit businessUnit);

    public BusinessUnit update(BusinessUnit businessUnit);

    public BusinessUnit get(String id);

    public List<BusinessUnit> getByOrganization(Organization organization);

}
