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
    @Column(name = "id")
    private Long id;

    @Column(name = "openId")
    private String openId;

    @Column(name = "state")
    private int state;//任务状态  0->未提交 1->待审核  2->审核成功 3->审核失败

    @Column(name = "remarks")
    private String remarks;  //任务备注 若审核失败 说明原因


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "taskID")
    private Task task;


    @OneToMany(targetEntity = ImgsTaskOrder.class, cascade = CascadeType.ALL)
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "taskOrderID")
    private List<ImgsTaskOrder> taskOrderImgs = new ArrayList<ImgsTaskOrder>();

    public TaskOrder() {
    }

    public TaskOrder(String openId, int state, String remarks, Task task, List<ImgsTaskOrder> taskOrderImgs) {
        this.openId = openId;
        this.state = state;
        this.remarks = remarks;
        this.task = task;
        this.taskOrderImgs = taskOrderImgs;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
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

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public List<ImgsTaskOrder> getTaskOrderImgs() {
        return taskOrderImgs;
    }

    public void setTaskOrderImgs(List<ImgsTaskOrder> taskOrderImgs) {
        this.taskOrderImgs = taskOrderImgs;
    }
}
