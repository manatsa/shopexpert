package com.mana.limo.service.impl;

import com.mana.limo.domain.BusinessUnit;
import com.mana.limo.domain.Organization;
import com.mana.limo.domain.User;
import com.mana.limo.repo.BusinessUnitRepo;
import com.mana.limo.service.BusinessUnitService;
import com.mana.limo.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @author :: codemaster
 * created on :: 19/10/2022
 * Package Name :: com.mana.limo.service.impl
 */

@Service
@Transactional(propagation = Propagation.SUPPORTS)
public class BusinessUnitServiceImpl implements BusinessUnitService {

    @Autowired
    BusinessUnitRepo repo;

    @Autowired
    UserService userService;

    @Autowired
    BusinessUnitService businessUnitService;

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<BusinessUnit> getAllBusinessUnits() {
        return repo.findAll();
    }

    @Override
    public BusinessUnit Save(BusinessUnit businessUnit) {
            businessUnit.setCreatedBy(entityManager.find(User.class,userService.getCurrentUser().getId()));
            businessUnit.setDateCreated(new Date());
            businessUnit.setId(UUID.randomUUID().toString());
            return repo.save(businessUnit);
    }

    @Transactional
    @Override
    public BusinessUnit update(BusinessUnit businessUnit) {
        BusinessUnit target=null;
        User user=userService.get(businessUnit.getCreatedBy().getId());
        if(businessUnit!=null && businessUnit.getId()!=null){
            target=entityManager.find(BusinessUnit.class, businessUnit.getId());
            businessUnit.setModifiedBy(userService.getCurrentUser());
            BeanUtils.copyProperties(businessUnit, target);
            target.setDateModified(new Date());
            target.setCreatedBy(user);
            return entityManager.merge(target);
        }

        return null;
    }

    @Override
    public BusinessUnit get(String id) {
        if(id!=null)
        return repo.getReferenceById(id);
        else{
            throw new IllegalArgumentException("Id cannot be empty!");
        }
    }

    @Override
    public List<BusinessUnit> getByOrganization(Organization organization) {
        return repo.getBusinessUnitsByOrganization(organization);
    }


}
