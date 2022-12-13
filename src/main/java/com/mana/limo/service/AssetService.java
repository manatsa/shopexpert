package com.mana.limo.service;

import com.mana.limo.domain.Asset;
import com.mana.limo.domain.BusinessUnit;
import com.mana.limo.domain.Organization;
import com.mana.limo.domain.enums.AssetType;

import java.util.List;

public interface AssetService {

    public List<Asset> getAllAssets();

    public Asset save(Asset asset);

    public Asset update(Asset asset);

    public Asset get(String id);

    public List<Asset> getAllByOrganization(Organization organization);

    public List<Asset> getAllByBusinessUnit(BusinessUnit businessUnit);

    public List<Asset> getAllByAssetType(AssetType assetType);
}
