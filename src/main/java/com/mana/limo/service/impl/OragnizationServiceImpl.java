package com.mana.limo.service.impl;

import com.mana.limo.domain.Organization;
import com.mana.limo.domain.User;
import com.mana.limo.repo.OrganizationRepo;
import com.mana.limo.service.OrganizationService;
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
public class OragnizationServiceImpl implements OrganizationService {

    @Autowired
    OrganizationRepo repo;

    @Autowired
    UserService userService;

    @Autowired
    OrganizationService organizationService;

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Organization> getAllOrganizations() {
        return repo.findAll();
    }

    @Override
    public Organization Save(Organization organization) {
//            organization.setCreatedBy(entityManager.find(User.class,userService.getCurrentUser().getId()));
//            organization.setDateCreated(new Date());
            organization.setId(UUID.randomUUID().toString());
            return repo.save(organization);
    }

    @Transactional
    @Override
    public Organization update(Organization organization) {
        Organization target=null;
//        User user=userService.get(organization.getCreatedBy().getId());
        if(organization!=null && organization.getId()!=null){
            target=entityManager.find(Organization.class, organization.getId());
//            organization.setModifiedBy(userService.getCurrentUser());
            BeanUtils.copyProperties(organization, target);
//            target.setDateModified(new Date());
//            target.setCreatedBy(user);
            return entityManager.merge(target);
        }

        return null;
    }

    @Override
    public Organization get(String id) {
        if(id!=null)
        return repo.getReferenceById(id);
        else{
            throw new IllegalArgumentException("Id cannot be empty!");
        }
    }


}
