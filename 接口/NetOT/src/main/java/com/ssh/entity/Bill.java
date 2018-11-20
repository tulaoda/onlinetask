package com.ssh.entity;

import javax.persistence.*;

@Table(name = "t_bill")
@Entity
public class Bill {
    @Id
    @GeneratedValue
    private Long id;
    private Double money;
    private String createTime;
    private int state;


    @ManyToOne()
    @JoinColumn(name = "openID")
    private User user;

    public Bill(Double money, String createTime, int state, User user) {
        this.money = money;
        this.createTime = createTime;
        this.state = state;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getMoney() {
        return money;
    }

    public void setMoney(Double money) {
        this.money = money;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
