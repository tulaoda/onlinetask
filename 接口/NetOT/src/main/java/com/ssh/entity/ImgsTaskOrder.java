package com.ssh.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "t_imgs_task_order")
public class ImgsTaskOrder {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private long id;

    @Column(name = "url")
    private String url;

    @Column(name = "foreignId")
    private Long foreignId;


    public ImgsTaskOrder() {
    }

    public ImgsTaskOrder(String url, Long foreignId) {
        this.url = url;
        this.foreignId = foreignId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getForeignId() {
        return foreignId;
    }

    public void setForeignId(Long foreignId) {
        this.foreignId = foreignId;
    }
}
