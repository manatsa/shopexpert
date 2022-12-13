package com.mana.limo.repo;

import com.mana.limo.domain.Asset;
import com.mana.limo.domain.BusinessUnit;
import com.mana.limo.domain.Organization;
import com.mana.limo.domain.enums.AssetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepo extends JpaRepository<Asset, String> {
    public List<Asset> getAssetsByOrganization(Organization organization);

    public List<Asset> getAssetsByBusinessUnit(BusinessUnit businessUnit);

    public List<Asset> getAssetsByAssetType(AssetType assetType);

}
