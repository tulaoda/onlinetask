package com.ssh.dao.impl;

import com.ssh.dao.BillDao;
import com.ssh.entity.Bill;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillDaoImpl implements BillDao {

    @Autowired
    private SessionFactory sessionFactory;

    private Session getCurrentSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public Bill load(Long id) {
        return (Bill) getCurrentSession().load(Bill.class, id);
    }

    @Override
    public Bill get(Long id) {
        return (Bill) getCurrentSession().get(Bill.class, id);
    }

    @Override
    public List<Bill> findAll() {
        String hql = "from Bill";
        return getCurrentSession().createQuery(hql).list();
    }

    @Override
    public void persist(Bill entity) {

    }

    @Override
    public Long save(Bill entity) {
        return null;
    }

    @Override
    public void saveOrUpdate(Bill entity) {

    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void flush() {

    }

    @Override
    public List<Bill> findBillByOpenId(String openId, int page, int pageSize) {
        String hql = "from Bill where openId=?";
        return getCurrentSession().createQuery(hql).setString(0, openId).
                setFirstResult((page - 1) * pageSize)
                .setMaxResults(pageSize).list();
    }
}
