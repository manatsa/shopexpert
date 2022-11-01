package com.mana.limo.repo;

import com.mana.limo.domain.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleRepo extends JpaRepository<Sale, String> {

    public List<Sale> getAllByActiveOrderByReceiptNumberAsc(boolean active);

    @Query("select s from Sale s where s.id=:id")
    public Sale getASaleById(@Param("id") String id);
}
