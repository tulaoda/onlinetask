package com.ssh.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "t_imgs_task_order")
public class ImgsTaskOrder implements java.io.Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @Column(name = "url")
    private String url;


    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "taskOrderID", unique = true)
    private TaskOrder taskOrder;

    public ImgsTaskOrder() {
    }

    public ImgsTaskOrder(String url, TaskOrder taskOrder) {
        this.url = url;
        this.taskOrder = taskOrder;
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

    public TaskOrder getTaskOrder() {
        return taskOrder;
    }

    public void setTaskOrder(TaskOrder taskOrder) {
        this.taskOrder = taskOrder;
    }
}
