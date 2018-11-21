package com.ssh.dao;

import com.ssh.base.DomainDao;
import com.ssh.entity.Bill;

import java.util.List;

public interface BillDao extends DomainDao<Bill, Long> {

    List<Bill> findBillByOpenId(String openId, int page, int pageSize);

    List<Bill> findBillByState(Integer state, int page, int pageSize);
}
