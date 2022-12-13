package com.mana.limo.service.impl;

import com.mana.limo.domain.Privilege;
import com.mana.limo.domain.Sale;
import com.mana.limo.domain.User;
import com.mana.limo.domain.UserRole;
import com.mana.limo.domain.enums.Status;
import com.mana.limo.repo.PrivilegeRepo;
import com.mana.limo.service.PrivilegeService;
import com.mana.limo.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @author :: codemaster
 * created on :: 3/11/2022
 * Package Name :: com.mana.limo.service.impl
 */
@Service
public class PrivilegeServiceImpl implements PrivilegeService {
    @Autowired
    PrivilegeRepo privilegeRepo;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    UserService userService;

    @Override
    public Privilege get(String id) {
        return privilegeRepo.getById(id);
    }

    @Override
    public Privilege save(Privilege t) {
        t.setCreatedBy(userService.get(userService.getCurrentUser().getId()));
        t.setId(UUID.randomUUID().toString());
        t.setDateCreated(new Date());
        return privilegeRepo.save(t);
    }

    @Override
    @Transactional
    public Privilege update(Privilege privilege) {
        Privilege target = null;
        User user = userService.get(privilege.getCreatedBy().getId());
        if (privilege != null && privilege.getId() != null) {
            target = entityManager.find(Privilege.class, privilege.getId());
            target.setModifiedBy(entityManager.find(User.class, userService.getCurrentUser().getId()));
            BeanUtils.copyProperties(privilege, target);
            target.setCreatedBy(user);
            target.setDateModified(new Date());
            if(!(target.getStatus().equals(Status.ACTIVE))){
                target.setActive(Boolean.FALSE);
            }else{
                target.setActive(Boolean.TRUE);
            }
            return entityManager.merge(target);
        }

        return null;
    }

    @Override
    public List<Privilege> getAllPrivileges() {
        return privilegeRepo.findAll();
    }

    @Override
    public List<Privilege> getPrivilegesByRole(UserRole userRole) {
        return null;
    }
}
