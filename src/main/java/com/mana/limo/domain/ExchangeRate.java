package com.mana.limo.domain;

import com.mana.limo.domain.enums.Currency;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.NumberFormat;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

/**
 * @author :: codemaster
 * created on :: 24/11/2022
 * Package Name :: com.mana.limo.domain
 */


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ExchangeRate extends  BaseEntity{

    @Enumerated
    private Currency currency;
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;
    @NumberFormat(style = NumberFormat.Style.CURRENCY)
    private double rate;
    private String details;

}
