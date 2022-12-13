/*
 * Copyright 2018 jmuzinda.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.mana.limo.util;

/**
 * @author :: codemaster
 * created on :: 14/10/2022
 * Package Name :: com.mana.limo.domain
 */

public interface Constants {

    public final String TITLE=" ShopExpert Shop Management System (SEMS) ::";
    public final String USER_CONSTANT = "left join fetch u.userRoles left join fetch u.organization left join fetch u.businessUnit";
    
    public final String USER_ROLE_CONSTANT = "left join fetch p.createdBy left join fetch p.modifiedBy ";
    

}