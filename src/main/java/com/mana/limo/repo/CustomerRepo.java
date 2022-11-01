package com.mana.limo.repo;

import com.mana.limo.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, String> {

    @Query("select c from Customer  c where c.active=:active and c.name like %:term% ")
    public List<Customer> getAllByActiveAndNameLike(@Param("active") boolean active, @Param("term") String term);

//    @Query("select c from Customer  c where c.active=:active and c.name like %:term% ")
    public Customer getCustomerByName( String name);
}
