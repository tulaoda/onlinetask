package com.ssh.entity;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "t_task")
public class Task implements java.io.Serializable {

    //    @GenericGenerator(name = "systemUUID", strategy = "uuid")
//    @GeneratedValue(generator = "systemUUID")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "taskId")
    private Long taskId;//任务id

    @Column(name = "name")
    private String name;//任务名称

    @Column(name = "commission")
    private double commission;//佣金

    @Column(name = "article")
    private String article;//文案

    @Column(name = "createTime")
    private String createTime;//创建时间

    @Column(name = "totalNo")
    private int totalNo;//任务总量

    @Column(name = "remainNo")
    private int remainNo;//剩余数量

    @Column(name = "state")
    private int state;//任务状态  1 任务进行中  2 任务已满员  3 任务人为结束


    @OneToMany(targetEntity = ImgsTask.class, cascade = CascadeType.ALL)
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "taskID")
    private Set taskImgs = new HashSet(0);


    @OneToMany(targetEntity = TaskOrder.class, cascade = CascadeType.ALL)
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "taskID")
    private Set taskOrders = new HashSet();//图片

    public Task() {
    }

    public Task(String name, double commission, String article, String createTime, int totalNo, int remainNo, int state, Set taskImgs, Set taskOrders) {
        this.name = name;
        this.commission = commission;
        this.article = article;
        this.createTime = createTime;
        this.totalNo = totalNo;
        this.remainNo = remainNo;
        this.state = state;
        this.taskImgs = taskImgs;
        this.taskOrders = taskOrders;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getCommission() {
        return commission;
    }

    public void setCommission(double commission) {
        this.commission = commission;
    }

    public String getArticle() {
        return article;
    }

    public void setArticle(String article) {
        this.article = article;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public int getTotalNo() {
        return totalNo;
    }

    public void setTotalNo(int totalNo) {
        this.totalNo = totalNo;
    }

    public int getRemainNo() {
        return remainNo;
    }

    public void setRemainNo(int remainNo) {
        this.remainNo = remainNo;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public Set getTaskImgs() {
        return taskImgs;
    }

    public void setTaskImgs(Set taskImgs) {
        this.taskImgs = taskImgs;
    }

    public Set getTaskOrders() {
        return taskOrders;
    }

    public void setTaskOrders(Set taskOrders) {
        this.taskOrders = taskOrders;
    }
}
