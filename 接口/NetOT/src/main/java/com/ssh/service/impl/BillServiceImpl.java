package com.ssh.service.impl;

import com.ssh.dao.BillDao;
import com.ssh.entity.Bill;
import com.ssh.service.BillService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BillServiceImpl implements BillService {


    private BillDao billDao;

    @Override
    public List<Bill> findBillByOpenId(String openId, int page, int pageSize) {
        return billDao.findBillByOpenId(openId, page, pageSize);
    }

    @Override
    public Bill load(Long id) {
        return billDao.load(id);
    }

    @Override
    public Bill get(Long id) {
        return billDao.get(id);
    }

    @Override
    public List<Bill> findAll() {
        return billDao.findAll();
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
}
