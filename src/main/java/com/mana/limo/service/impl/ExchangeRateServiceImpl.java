package com.mana.limo.service.impl;

import com.mana.limo.domain.ExchangeRate;
import com.mana.limo.domain.ExchangeRate;
import com.mana.limo.domain.User;
import com.mana.limo.repo.ExchangeRateRepo;
import com.mana.limo.service.ExchangeRateService;
import com.mana.limo.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;
import java.util.UUID;

/**
 * @author :: codemaster
 * created on :: 24/11/2022
 * Package Name :: com.mana.limo.service.impl
 */

@Service
public class ExchangeRateServiceImpl implements ExchangeRateService {

    @Autowired
    ExchangeRateRepo exchangeRateRepo;
    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    UserService userService;

    @Override
    public ExchangeRate save(ExchangeRate exchangeRate) {
        exchangeRate.setCreatedBy(entityManager.find(User.class,userService.getCurrentUser().getId()));
        exchangeRate.setDateCreated(new Date());
        exchangeRate.setId(UUID.randomUUID().toString());
        return exchangeRateRepo.save(exchangeRate);
    }

    @Override
    public ExchangeRate update(ExchangeRate exchangeRate) {
        ExchangeRate target=null;
        User user=userService.get(exchangeRate.getCreatedBy().getId());
        if(exchangeRate.getId()!=null){
            target=entityManager.find(ExchangeRate.class, exchangeRate.getId());
            exchangeRate.setModifiedBy(userService.getCurrentUser());
            BeanUtils.copyProperties(exchangeRate, target);
            target.setModifiedBy(entityManager.find(User.class,userService.getCurrentUser().getId()));
            target.setDateModified(new Date());
            target.setCreatedBy(user);
            return entityManager.merge(target);
        }

        return null;
    }

    @Override
    public ExchangeRate getExchangeRateBetween(Date start, Date end) {
        return exchangeRateRepo.getExchangeRateByDateCreatedBetween(start, end);
    }

    @Override
    public ExchangeRate getLatestRate() {
        return entityManager.createQuery("select e from ExchangeRate e left join fetch e.createdBy left join fetch e.modifiedBy order by e.startDate desc ", ExchangeRate.class)
                .setMaxResults(1).getSingleResult();
    }


}
