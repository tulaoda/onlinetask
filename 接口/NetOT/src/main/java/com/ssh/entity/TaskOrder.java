package com.ssh.entity;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "t_taskOrder")
public class TaskOrder {
    @Id
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    private String id;
    private String openId;
    private int State;//任务状态  0->未提交 1->待审核  2->审核成功 3->审核失败
    private String remarks;  //任务备注 若审核失败 说明原因
    private String foreignId;

//
//    @OneToMany(targetEntity = Imgs.class, cascade = CascadeType.ALL)
//    @Fetch(FetchMode.JOIN)
//    //updatable=false很关键，如果没有它，在级联删除的时候就会报错(反转的问题)
//    @JoinColumn(name = "foreignId", updatable = false)
//    private List<Imgs> taskOrderImgs = new ArrayList<Imgs>();//图片

    public TaskOrder() {
    }

    public TaskOrder(String openId, int state, String remarks, String foreignId, List<Imgs> taskOrderImgs) {
        this.openId = openId;
        State = state;
        this.remarks = remarks;
        this.foreignId = foreignId;
//        this.taskOrderImgs = taskOrderImgs;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public int getState() {
        return State;
    }

    public void setState(int state) {
        State = state;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getForeignId() {
        return foreignId;
    }

    public void setForeignId(String foreignId) {
        this.foreignId = foreignId;
    }

//    public List<Imgs> getTaskOrderImgs() {
//        return taskOrderImgs;
//    }

//    public void setTaskOrderImgs(List<Imgs> taskOrderImgs) {
//        this.taskOrderImgs = taskOrderImgs;
//    }
}
