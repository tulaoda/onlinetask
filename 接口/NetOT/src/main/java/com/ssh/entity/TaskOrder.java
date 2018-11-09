package com.ssh.entity;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_taskOrder")
public class TaskOrder {


    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "openId")
    private String openId;

    @Column(name = "state")
    private int state;//任务状态  0->未提交 1->待审核  2->审核成功 3->审核失败

    @Column(name = "remarks")
    private String remarks;  //任务备注 若审核失败 说明原因

    @Column(name = "foreignId")
    private Long foreignId;


    @OneToMany(targetEntity = ImgsTaskOrder.class, cascade = CascadeType.ALL)
    @Fetch(FetchMode.JOIN)
    //updatable=false很关键，如果没有它，在级联删除的时候就会报错(反转的问题)
    @JoinColumn(name = "foreignId", updatable = false)
    private List<ImgsTaskOrder> taskOrderImgs = new ArrayList<ImgsTaskOrder>();//图片

    public TaskOrder() {
    }

    public TaskOrder(Long id, String openId, int state, String remarks, Long foreignId, List<ImgsTaskOrder> taskOrderImgs) {
        this.id = id;
        this.openId = openId;
        state = state;
        this.remarks = remarks;
        this.foreignId = foreignId;
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
        state = state;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Long getForeignId() {
        return foreignId;
    }

    public void setForeignId(Long foreignId) {
        this.foreignId = foreignId;
    }

    public List<ImgsTaskOrder> getTaskOrderImgs() {
        return taskOrderImgs;
    }

    public void setTaskOrderImgs(List<ImgsTaskOrder> taskOrderImgs) {
        this.taskOrderImgs = taskOrderImgs;
    }
}
