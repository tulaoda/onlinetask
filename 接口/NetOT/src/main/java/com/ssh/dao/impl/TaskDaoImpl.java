package com.ssh.dao.impl;

import com.ssh.dao.TaskDao;
import com.ssh.entity.Task;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TaskDaoImpl implements TaskDao {

    @Autowired
    private SessionFactory sessionFactory;

    private Session getCurrentSession() {
        return this.sessionFactory.getCurrentSession();
    }

    public Task load(Long id) {
        return null;
    }

    public Task get(Long id) {
        return (Task) getCurrentSession().get(Task.class, id);
    }

    public List<Task> findAll() {
        String hql = "from Task";
        return getCurrentSession().createQuery(hql).list();

    }

    public void persist(Task entity) {

    }

    public Long save(Task entity) {
        return (Long) getCurrentSession().save(entity);
    }

    public void saveOrUpdate(Task entity) {

    }

    public void delete(Long id) {
        Task task = load(id);
        getCurrentSession().delete(task);
    }

    public void flush() {

    }

    @Override
    public List<Task> findAllTask(int state, int page, int pageSize) {
//        String hql = "from Task where state=? order by taskId desc";
        String hql = "from Task order by taskId desc";

        return getCurrentSession().createQuery(hql).
                setFirstResult((page - 1) * pageSize)
                .setMaxResults(pageSize).list();
    }
}
