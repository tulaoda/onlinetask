package com.ssh.entity;


import javax.persistence.*;


@Entity
@Table(name = "t_user")
public class User {
    @Id
    @Column(name = "openid")
    private String openid;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "wechat")
    private String wechat;

    @Column(name = "alipay")
    private String alipay;

    @Column(name = "formId")
    private String formId;

    @Column(name = "balance")
    private double balance;

    @Column(name = "encashTotal")
    private double encashTotal;


    @Column(name = "encashing")
    private double encashing;

    public User() {
    }

    public User(String openid, String name, String address, String telephone, String wechat, String alipay, String formId, double balance, double encashTotal, double encashing) {
        this.openid = openid;
        this.name = name;
        this.address = address;
        this.telephone = telephone;
        this.wechat = wechat;
        this.alipay = alipay;
        this.formId = formId;
        this.balance = balance;
        this.encashTotal = encashTotal;
        this.encashing = encashing;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getWechat() {
        return wechat;
    }

    public void setWechat(String wechat) {
        this.wechat = wechat;
    }

    public String getAlipay() {
        return alipay;
    }

    public void setAlipay(String alipay) {
        this.alipay = alipay;
    }

    public String getFormId() {
        return formId;
    }

    public void setFormId(String formId) {
        this.formId = formId;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public double getEncashTotal() {
        return encashTotal;
    }

    public void setEncashTotal(double encashTotal) {
        this.encashTotal = encashTotal;
    }

    public double getEncashing() {
        return encashing;
    }

    public void setEncashing(double encashing) {
        this.encashing = encashing;
    }
}
