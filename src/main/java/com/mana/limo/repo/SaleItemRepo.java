package com.mana.limo.repo;

import com.mana.limo.domain.Sale;
import com.mana.limo.domain.SaleItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleItemRepo extends JpaRepository<SaleItem, String> {
    @Query("select s from SaleItem s left join fetch s.product p where s.sale.id=:saleId")
    public List<SaleItem> getAllBySaleId(String saleId);

    @Query("select s from SaleItem s left join fetch s.product p where p.id=:productId and s.quantity=:quantity")
    public SaleItem getByProductIdAndQuantity(@Param("productId") String productId, @Param("quantity") int quantity);

    @Modifying
    @Query("delete from SaleItem s where  s.sale.id=:saleId")
    public  void deleteAllBySaleId(@Param("saleId") String saleId);
}
