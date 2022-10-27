package com.mana.limo.repo;

import com.mana.limo.domain.BusinessUnit;
import com.mana.limo.domain.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusinessUnitRepo extends JpaRepository<BusinessUnit, String> {

    public List<BusinessUnit> getBusinessUnitsByOrganization(Organization organization);
}
