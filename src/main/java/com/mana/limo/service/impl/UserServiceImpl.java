package com.mana.limo.service.impl;

import com.mana.limo.domain.Customer;
import com.mana.limo.domain.User;
import com.mana.limo.dto.SearchDTO;
import com.mana.limo.repo.UserRepo;
import com.mana.limo.service.UserRoleService;
import com.mana.limo.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.Date;
import java.util.List;


@Repository
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class UserServiceImpl implements UserService {

    final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Lazy
    @Resource
    private UserRepo userRepo;

    @PersistenceContext
    private EntityManager entityManager;
    @Lazy
    @Resource
    private UserRoleService userRoleService;

    @Override
    public List<User> getAll() {
        return userRepo.getOptAll(Boolean.TRUE);
    }

    @Override
    public User get(String id) {
        return userRepo.findById(id).get();
    }

    @Override
    public void delete(User t) {
        if (t.getId() == null) {
            throw new IllegalStateException("Item to be deleted is in an inconsistent state");
        }
        t.setActive(Boolean.FALSE);
        userRepo.save(t);
    }


    @Override
    @Transactional
    public User Save(User t) {
        if (t.getId() == null) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String hashedPassword = encoder.encode(t.getPassword());
            t.setPassword(hashedPassword);
            return userRepo.save(t);
        }
        return userRepo.save(t);
    }

    @Override
    @Transactional
    public User changePassword(User t) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(8);
        String hashedPassword = encoder.encode(t.getPassword());
        t.setPassword(hashedPassword);
        return userRepo.save(t);
    }

    @Transactional
    @Override
    public User update(User user) {
        User target=null;
        if(user!=null && user.getId()!=null){
            target=entityManager.find(User.class, user.getId());
            BeanUtils.copyProperties(user, target);
            return entityManager.merge(target);
        }

        return null;
    }


    @Override
    public User findByUserName(String name) {
        return userRepo.findByUserName(name, Boolean.TRUE);
    }

    @Override
    public User getCurrentUser() {
        String username = getCurrentUsername();
        if (username == null) {
            return null;
        }
        User user = findByUserName(username);
        if (user == null) {
            return null;
        }
        return user;
    }

    @Override
    public String getCurrentUsername() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal() == null) {
            return null;
        }
        if (authentication.getPrincipal() instanceof String) {
            String principal = (String) authentication.getPrincipal();
            if (principal.compareTo("anonymousUser") != 0) {
                return null;
            }
            return principal;
        }
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }


    @Override
    public List<User> searchUsers(String [] names) {
        if (names.length == 1) {
            return userRepo.findByUserNameLike(names[0]+"%");
        }
        return userRepo.findByNames(names[0], names[1]);
    }


}
