package com.mana.limo.service.impl;

import com.mana.limo.domain.User;
import com.mana.limo.domain.UserRole;
import com.mana.limo.repo.UserRoleRepo;
import com.mana.limo.service.UserRoleService;
import com.mana.limo.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * @author :: codemaster
 * created on :: 14/10/2022
 * Package Name :: com.mana.limo.service
 */

@Service
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class UserRoleServiceImpl implements UserRoleService {

    @Resource
    private UserRoleRepo userRoleRepo;
    @Resource
    private UserService userService;

    @Override
    public List<UserRole> getAll() {
        return userRoleRepo.findAll();
    }

    @Override
    public UserRole get(String id) {
        return userRoleRepo.findById(id).get();
    }

    @Override
    public void delete(UserRole t) {
        if (t.getId() == null) {
            throw new IllegalStateException("Item to be deleted is in an inconsistent state");
        }
        t.setActive(Boolean.FALSE);
        userRoleRepo.save(t);
    }

    @Override
    public List<UserRole> getPageable() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    @Transactional
    public UserRole save(UserRole t) {
        if (t.getId() == null) {
            //t.setId(UUIDGen.generateUUID());
            t.setCreatedBy(userService.getCurrentUser());
            t.setDateCreated(new Date());
            return userRoleRepo.save(t);
        }
        t.setModifiedBy(userService.getCurrentUser());
        t.setDateModified(new Date());
        return userRoleRepo.save(t);
    }

    @Override
    public UserRole getByName(String name) {
        return userRoleRepo.getUserRoleByName(name);
    }

    @Override
    public Boolean checkDuplicate(UserRole current, UserRole old) {
        if (current.getId() != null) {
            /**
             * @param current is in existence
             */
            if (!current.getName().equals(old.getName())) {
                if (userRoleRepo.getUserRoleByName(current.getName()) != null) {
                    return true;
                }
            }

        } else if (current.getId() == null) {
            /**
             * @param current is new
             */
            if (userRoleRepo.getUserRoleByName(current.getName()) != null) {
                return true;
            }
        }
        return false;
    }

    @Override
    public Set<UserRole> findByNamesIn(Set<String> names) {
        return userRoleRepo.findByNamesIn(names);
    }


}