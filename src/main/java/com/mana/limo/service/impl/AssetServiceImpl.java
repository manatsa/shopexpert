package com.mana.limo.service.impl;

import com.mana.limo.domain.Asset;
import com.mana.limo.domain.BusinessUnit;
import com.mana.limo.domain.Organization;
import com.mana.limo.domain.User;
import com.mana.limo.domain.enums.AssetType;
import com.mana.limo.repo.AssetRepo;
import com.mana.limo.service.AssetService;
import com.mana.limo.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @author :: codemaster
 * created on :: 20/11/2022
 * Package Name :: com.mana.limo.service.impl
 */

@Service
public class AssetServiceImpl implements AssetService {

    @Autowired
    AssetRepo assetRepo;
    @Autowired
    UserService userService;
    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Asset> getAllAssets() {
        return assetRepo.findAll(Sort.by("dateCreated").descending());
    }

    @Transactional
    @Override
    public Asset save(Asset asset) {
        asset.setId(UUID.randomUUID().toString());
        asset.setCreatedBy(userService.get(userService.getCurrentUser().getId()));
        asset.setDateCreated(new Date());
        return assetRepo.save(asset) ;
    }

    @Override
    public Asset update(Asset asset) {
        Asset target=null;
        User user=userService.get(asset.getCreatedBy().getId());
        if(asset!=null && asset.getId()!=null){
            target=get(asset.getId());
            asset.setModifiedBy(userService.get(userService.getCurrentUser().getId()));
            BeanUtils.copyProperties(asset, target);
            target.setDateModified(new Date());
            target.setCreatedBy(user);
            return entityManager.merge(target);
        }
        return null;
    }

    @Override
    public Asset get(String id) {
        return assetRepo.getById(id);
    }

    @Override
    public List<Asset> getAllByOrganization(Organization organization) {
        return assetRepo.getAssetsByOrganization(organization);
    }

    @Override
    public List<Asset> getAllByBusinessUnit(BusinessUnit businessUnit) {
        return assetRepo.getAssetsByBusinessUnit(businessUnit);
    }

    @Override
    public List<Asset> getAllByAssetType(AssetType assetType) {
        return assetRepo.getAssetsByAssetType(assetType);
    }
}
