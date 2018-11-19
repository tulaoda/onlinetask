package com.ssh.dao.impl;

import com.ssh.dao.TaskOrderDao;
import com.ssh.entity.TaskOrder;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TaskOrderDaoImpl implements TaskOrderDao {
    @Autowired
    private SessionFactory sessionFactory;

    private Session getCurrentSession() {
        return this.sessionFactory.getCurrentSession();
    }

    public TaskOrder load(Long id) {
        return null;
    }

    public TaskOrder get(Long id) {
        return (TaskOrder) getCurrentSession().get(TaskOrder.class, id);
    }

    public List<TaskOrder> findAll() {
        String hql = "from TaskOrder";
        return getCurrentSession().createQuery(hql).list();

    }

    public void persist(TaskOrder entity) {

    }

    public Long save(TaskOrder entity) {
        return (Long) getCurrentSession().save(entity);
    }

    public void saveOrUpdate(TaskOrder entity) {
        getCurrentSession().saveOrUpdate(entity);
    }

    public void delete(Long id) {
        TaskOrder taskOrder = load(id);
        getCurrentSession().delete(taskOrder);
    }

    public void flush() {

    }

    public List<TaskOrder> findAllTaskOrder(Long taskID, int page, int pageSize) {
//        String hql = "from TaskOrder order by taskOrderId desc";
        String hql = "from TaskOrder where taskID=? order by taskOrderId desc";

        return getCurrentSession().createQuery(hql).setLong(0, taskID).
                setFirstResult((page - 1) * pageSize)
                .setMaxResults(pageSize).list();
    }

    @Override
    public List<TaskOrder> taskOrderByOpenId(String openId, int state, int page, int pageSize) {
        String hql = "from TaskOrder where openId=? and state=? order by taskOrderId desc";

        return getCurrentSession().createQuery(hql).setString(0, openId).setInteger(1, state).
                setFirstResult((page - 1) * pageSize)
                .setMaxResults(pageSize).list();
    }

    @Override
    public List<TaskOrder> taskOrderByOpenIdNoState(String openId, int page, int pageSize) {
        String hql = "from TaskOrder where openId=? order by taskOrderId desc";

        return getCurrentSession().createQuery(hql).setString(0, openId).
                setFirstResult((page - 1) * pageSize)
                .setMaxResults(pageSize).list();
    }

    @Override
    public Long totalCount() {
        String hql = "select count(*) from TaskOrder";
        return (Long) getCurrentSession().createQuery(hql).uniqueResult();
    }
}
