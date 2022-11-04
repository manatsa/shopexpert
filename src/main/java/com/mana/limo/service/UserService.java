/*
 * Copyright 2014 Judge Muzinda.
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
package com.mana.limo.service;


import com.mana.limo.domain.User;
import com.mana.limo.dto.SearchDTO;

import java.util.List;

/**
 * @author :: codemaster
 * created on :: 14/10/2022
 * Package Name :: com.mana.limo.service
 */

public interface UserService {

    public User get(String id);

    public List<User> getAllActive();
    public List<User> getAll();

    public User Save(User user);

    public void delete(User user);

    public User findByUserName(String name);

    public String getCurrentUsername();

    public User getCurrentUser();
    
    public User changePassword(User t);
    
    public User update(User user);
    
    public List<User> searchUsers(String [] names);


}
