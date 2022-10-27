package com.mana.limo.service;

import com.mana.limo.domain.Organization;

import java.util.List;

public interface OrganizationService {

    public List<Organization> getAllOrganizations();

    public Organization Save(Organization organization);

    public Organization update(Organization organization);

    public Organization get(String id);

}
