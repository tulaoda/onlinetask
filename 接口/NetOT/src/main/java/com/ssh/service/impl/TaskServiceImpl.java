package com.ssh.service.impl;

import com.ssh.dao.TaskDao;
import com.ssh.entity.Task;
import com.ssh.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TaskServiceImpl implements TaskService {


    @Autowired
    private TaskDao taskDao;

    public Task load(Long id) {
        return taskDao.load(id);
    }

    public Task get(Long id) {
        return taskDao.get(id);
    }

    public List<Task> findAll() {
        return taskDao.findAll();
    }

    public void persist(Task entity) {
        taskDao.persist(entity);
    }

    public Long save(Task entity) {
        return taskDao.save(entity);
    }

    public void saveOrUpdate(Task entity) {
        taskDao.saveOrUpdate(entity);
    }

    public void delete(Long id) {
        taskDao.delete(id);
    }

    public void flush() {
        taskDao.flush();
    }

    @Override
    public List<Task> findAllTask(String openId, int page, int pageSize) {
        return taskDao.findAllTask(openId, page, pageSize);
    }

    @Override
    public List<Task> findAllTaskNoState(int page, int pageSize) {
        return taskDao.findAllTaskNoState(page, pageSize);
    }

    @Override
    public Long totalCount() {
        return taskDao.totalCount();
    }
}
