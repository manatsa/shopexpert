package com.mana.limo.repo;

import com.mana.limo.domain.Inventory;
import com.mana.limo.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepo extends JpaRepository<Inventory, String> {

    public Inventory findByPriceAndProductAndForeignCode(double price, Product product, String code);

    @Query("select i from Inventory i left join fetch i.product p where p.name like %:term% or p.description like %:term% or p.packaging like %:term%")
    List<Inventory> searchProductForSale(@Param("term") String term);
}
