package com.mana.limo.service;

import com.mana.limo.domain.Privilege;
import com.mana.limo.domain.UserRole;

import java.util.List;

/**
 * @author :: codemaster
 * created on :: 3/11/2022
 * Package Name :: com.mana.limo.service
 */

public interface PrivilegeService {

    public Privilege get(String id);
    public Privilege save(Privilege userRole);

    public Privilege update(Privilege userRole);
    public List<Privilege> getAllPrivileges();

    public List<Privilege> getPrivilegesByRole(UserRole userRole);

}
