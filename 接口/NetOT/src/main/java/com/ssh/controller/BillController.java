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

@Controller
@RequestMapping(value = "/bill")
public class BillController {

    @Autowired
    private BillService billService;

    @Autowired
    private UserService userService;

    //更新任务完成状态
    @RequestMapping(value = "createBill", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData updateOrderState(@RequestBody Bill bill) {
        ResponseData responseData = ResponseData.ok();
        bill.setCreateTime(CreateOrderID.getCurrentTime());
        bill.setUser(userService.get(bill.getUser()));
        billService.save(bill);
        return responseData;
    }

}
