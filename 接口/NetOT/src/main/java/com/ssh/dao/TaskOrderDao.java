package com.ssh.dao;

import com.ssh.base.DomainDao;
import com.ssh.entity.TaskOrder;

import java.util.List;

public interface TaskOrderDao extends DomainDao<TaskOrder, Long> {
    List<TaskOrder> findAllTaskOrder(Long taskID, int page, int pageSize);

    List<TaskOrder> taskOrderByOpenId(String openId, int state, int page, int pageSize);
}
