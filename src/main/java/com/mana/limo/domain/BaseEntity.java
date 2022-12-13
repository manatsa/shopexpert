/*
 * Copyright 2015 Judge Muzinda.
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
package com.mana.limo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mana.limo.domain.enums.RecordSource;
import com.mana.limo.domain.enums.Status;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author :: codemaster
 * created on :: 14/10/2022
 * Package Name :: com.mana.limo.domain
 */

@Getter
@Setter
@MappedSuperclass
//@EntityListeners(AuditingEntityListener.class)
abstract public class BaseEntity implements Serializable {
    @Id
    private String id;
    private Status status;

    @JsonIgnore
//    @CreatedBy
    @JoinColumn(name="created_by")
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private User createdBy;

    @JsonIgnore
//    @LastModifiedBy
    @JoinColumn(name="modified_by")
    @ManyToOne(fetch = FetchType.LAZY)
    private User modifiedBy;

//    @CreatedDate
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date dateCreated;

//    @LastModifiedDate
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date dateModified;

    @Version
    private Long version;
    private Boolean active = Boolean.TRUE;
    @Enumerated
    private RecordSource recordSource = RecordSource.WEB_APP;
    public BaseEntity() {
    }
    public BaseEntity(String id) {
        this.id = id;
    }


    public  boolean equals(BaseEntity entity){
        return  this.getId().equals(entity.getId());
    }
}
