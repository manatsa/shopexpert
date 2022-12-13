package com.mana.limo.repo;

import com.mana.limo.domain.ExchangeRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ExchangeRateRepo extends JpaRepository<ExchangeRate, String> {

    public ExchangeRate getExchangeRateByDateCreatedBetween(Date start, Date end);

    public List<ExchangeRate> getAllByRate(double rate);

    @Query("select e from ExchangeRate e left join fetch e.createdBy left join fetch e.modifiedBy order by e.startDate desc")
    public ExchangeRate getExchangeRateByEffective();
}
