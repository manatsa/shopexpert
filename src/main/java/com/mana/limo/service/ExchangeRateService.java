package com.mana.limo.service;

import com.mana.limo.domain.ExchangeRate;

import java.util.Date;

/**
 * @author :: codemaster
 * created on :: 24/11/2022
 * Package Name :: com.mana.limo.service
 */

public interface ExchangeRateService {

    public ExchangeRate save(ExchangeRate exchangeRate);

    public ExchangeRate update(ExchangeRate exchangeRate);
    public ExchangeRate getExchangeRateBetween(Date start, Date end);

    public ExchangeRate getLatestRate();
}
