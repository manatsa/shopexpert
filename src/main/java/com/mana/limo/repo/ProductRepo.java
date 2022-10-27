package com.mana.limo.repo;

import com.mana.limo.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, String> {

    @Query("select p from Product p left join fetch p.businessUnit where p.name like %:term% " +
            "or p.businessUnit.name like %:term% or p.description like %:term% or p.packaging like %:term% ")
    public List<Product> searchProductsGeneral(@RequestParam(value = "term", required = false ) String term);


}
