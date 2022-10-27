package com.mana.limo.repo;

import com.mana.limo.domain.SaleItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleItemRepo extends JpaRepository<SaleItem, String> {
}
