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
        try {
            billList = billService.findBillByOpenId(openId, page, pageSize);
        } catch (Exception e) {
            e.printStackTrace();
        }
        responseData.putDataValue("bill", billList);
        return responseData;
    }

}
