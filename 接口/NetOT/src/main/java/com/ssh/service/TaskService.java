package com.ssh.service;

import com.ssh.base.DomainDao;
import com.ssh.entity.Task;

import java.util.List;

public interface TaskService extends DomainDao<Task, Long> {
    List<Task> findAllTask(String openId, int page, int pageSize);

    List<Task> findAllTaskNoState(int page, int pageSize);

    Long totalCount();
}
