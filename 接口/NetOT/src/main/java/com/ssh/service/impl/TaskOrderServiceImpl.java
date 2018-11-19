package com.ssh.service.impl;

import com.ssh.dao.TaskOrderDao;
import com.ssh.entity.TaskOrder;
import com.ssh.service.TaskOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TaskOrderServiceImpl implements TaskOrderService {

    @Autowired
    private TaskOrderDao taskOrderDao;

    @Override
    public List<TaskOrder> findAllTaskOrder(Long taskID, int page, int pageSize) {
        return taskOrderDao.findAllTaskOrder(taskID, page, pageSize);
    }

    @Override
    public List<TaskOrder> taskOrderByOpenId(String openId, int state, int page, int pageSize) {
        return taskOrderDao.taskOrderByOpenId(openId, state, page, pageSize);

    }

    @Override
    public List<TaskOrder> taskOrderByOpenIdNoState(String openId, int page, int pageSize) {
        return taskOrderDao.taskOrderByOpenIdNoState(openId, page, pageSize);
    }

    @Override
    public Long totalCount() {
        return taskOrderDao.totalCount();
    }

    @Override
    public TaskOrder load(Long id) {
        return taskOrderDao.load(id);
    }

    @Override
    public TaskOrder get(Long id) {
        return taskOrderDao.get(id);
    }

    @Override
    public List<TaskOrder> findAll() {
        return null;
    }

    @Override
    public void persist(TaskOrder entity) {
    }

    @Override
    public Long save(TaskOrder entity) {
        return taskOrderDao.save(entity);
    }

    @Override
    public void saveOrUpdate(TaskOrder entity) {
        taskOrderDao.saveOrUpdate(entity);
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void flush() {

    }
}
