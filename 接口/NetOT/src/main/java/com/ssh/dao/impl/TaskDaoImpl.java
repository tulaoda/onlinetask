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
        return (Task) getCurrentSession().load(Task.class, id);
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
        Task task = get(id);
        getCurrentSession().delete(task);
    }

    public void flush() {

    }

    public List<Task> findAllTask(int state, int page, int pageSize) {
//        select * from t_task where taskId not in (select taskId from t_taskOrder where openId='oHojD5Fw8TwnkceMMNjxqwLrw2nQ');
//        String hql = "from Task where state=? order by taskId desc";
        String hql = "from Task t where t.taskId not in (Select o.task from TaskOrder o where openId=?)";
        return getCurrentSession().createQuery(hql).setString(0, "oHojD5Fw8TwnkceMMNjxqwLrw2nQ").
                setFirstResult((page - 1) * pageSize)
                .setMaxResults(pageSize).list();
    }

    @Override
    public List<Task> findAllTaskNoState(int page, int pageSize) {
        String hql = "from Task order by taskId desc";
        return getCurrentSession().createQuery(hql).setFirstResult((page - 1) * pageSize)
                .setMaxResults(pageSize).list();
    }
}
