package com.ssh.entity;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "t_taskOrder")
public class TaskOrder implements java.io.Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "taskOrderId")
    private Long taskOrderId;

    @Column(name = "state")
    private int state;//任务状态  0->未提交 1->待审核  2->审核成功 3->审核失败

    @Column(name = "remarks")
    private String remarks;  //任务备注 若审核失败 说明原因

    @Column(name = "startImg")
    private String startImg;  //任务开始图片

    @Column(name = "endImg")
    private String endImg;  //任务结束图片

    @Column(name = "createTime")
    private String createTime;//创建时间

    @ManyToOne()
    @JoinColumn(name = "taskID")
    private Task task;


    @ManyToOne()
    @JoinColumn(name = "openID")
    private User user;

    public TaskOrder() {
    }

    public TaskOrder(int state, String remarks, String startImg, String endImg, String createTime, Task task, User user) {
        this.state = state;
        this.remarks = remarks;
        this.startImg = startImg;
        this.endImg = endImg;
        this.createTime = createTime;
        this.task = task;
        this.user = user;
    }

    public Long getTaskOrderId() {
        return taskOrderId;
    }

    public void setTaskOrderId(Long taskOrderId) {
        this.taskOrderId = taskOrderId;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getStartImg() {
        return startImg;
    }

    public void setStartImg(String startImg) {
        this.startImg = startImg;
    }

    public String getEndImg() {
        return endImg;
    }

    public void setEndImg(String endImg) {
        this.endImg = endImg;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
