package com.ssh.dao;

import com.ssh.base.DomainDao;
import com.ssh.entity.Task;

import java.util.List;

public interface TaskDao extends DomainDao<Task, Long> {
    List<Task> findAllTask(int state, int page, int pageSize);

    List<Task> findAllTaskNoState(int page, int pageSize);

}
