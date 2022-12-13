package com.mana.limo.dto;

import com.mana.limo.domain.Inventory;
import com.mana.limo.domain.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Objects;

/**
 * @author :: codemaster
 * created on :: 27/10/2022
 * Package Name :: com.mana.limo.dto
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleItemDTO {
    private int quantity;
    private Inventory inventory;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SaleItemDTO that = (SaleItemDTO) o;
        return quantity == that.quantity && inventory.getId().equals(that.inventory);
    }

    @Override
    public int hashCode() {
        return Objects.hash(quantity, inventory.getId());
    }
}
