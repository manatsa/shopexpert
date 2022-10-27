package com.mana.limo.util;

import com.mana.limo.domain.enums.MsgType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author :: codemaster
 * created on :: 18/10/2022
 * Package Name :: com.mana.limo.util
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    public String data;
    public MsgType type;
}
