package com.ssh.controller;

import com.ssh.entity.Bill;
import com.ssh.service.BillService;
import com.ssh.service.UserService;
import com.ssh.utils.CreateOrderID;
import com.ssh.utils.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "/bill")
public class BillController {

    @Autowired
    private BillService billService;

    @Autowired
    private UserService userService;

    //更新任务完成状态
    @RequestMapping(value = "createBill", method = RequestMethod.GET)
    @ResponseBody
    public ResponseData createBill(Double money, String openID) {
        ResponseData responseData = ResponseData.ok();
        Bill bill = new Bill();
        bill.setCreateTime(CreateOrderID.getCurrentTime());
        bill.setUser(userService.getUserByOpenId(openID));
        bill.getUser().setBalance(bill.getUser().getBalance() - money);//余额减去
        bill.getUser().setEncashing(bill.getUser().getEncashing() + money);//正在提现加上
        bill.setMoney(money);
        bill.setState(0);
        billService.save(bill);
        return responseData;
    }


    //查询当前用户的所有任务记录
    @RequestMapping(value = "findBillByOpenId", method = RequestMethod.GET)
    @ResponseBody
    public ResponseData findBillByOpenId(String openId, Integer page, Integer pageSize) {
        ResponseData responseData = ResponseData.ok();
        List<Bill> billList = null;
        double balance = 0;
        try {
            billList = billService.findBillByOpenId(openId, page, pageSize);
            balance = userService.getUserByOpenId(openId).getBalance();
        } catch (Exception e) {
            e.printStackTrace();
        }
        responseData.putDataValue("bill", billList);
        responseData.putDataValue("balance", balance);
        return responseData;
    }

    //修改状态
    @RequestMapping(value = "updateBillState", method = RequestMethod.GET)
    @ResponseBody
    public ResponseData updateBillState(Long id, Integer state) {
        ResponseData responseData = ResponseData.ok();
        try {
            Bill bill = billService.get(id);
            if (state == 1) {
                bill.getUser().setEncashing(bill.getUser().getEncashing() - bill.getMoney());//减去正在提现的金额
                bill.getUser().setEncashTotal(bill.getUser().getEncashTotal() + bill.getMoney());//加到已提现记录
            }
            bill.setState(state);
            billService.saveOrUpdate(bill);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return responseData;
    }


    //查询所有未审核的提现记录
    @RequestMapping(value = "findBillByState", method = RequestMethod.GET)
    @ResponseBody
    public ResponseData findBillByState(Integer state, Integer page, Integer pageSize) {
        ResponseData responseData = ResponseData.ok();
        List<Bill> billList = null;
        Long total = null;
        try {
            billList = billService.findBillByState(state, page, pageSize);
            total = billService.totalCount(state);
        } catch (Exception e) {
            e.printStackTrace();
        }
        responseData.putDataValue("bill", billList);
        responseData.putDataValue("total", total);
        return responseData;
    }
}
