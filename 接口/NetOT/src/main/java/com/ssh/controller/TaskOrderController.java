package com.ssh.controller;

import com.ssh.entity.Task;
import com.ssh.entity.TaskOrder;
import com.ssh.service.TaskOrderService;
import com.ssh.service.TaskService;
import com.ssh.utils.CreateOrderID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/taskOrder")
public class TaskOrderController {


    @Autowired
    private TaskOrderService taskOrderService;


    @Autowired
    private TaskService taskService;

    //添加任务
    @RequestMapping(value = "createTaskOrder", method = RequestMethod.GET)
    @ResponseBody
    public Map createTaskOrder(String openId,
                               Long taskId
    ) {
        Map map = new HashMap();
        System.out.println(openId + "   " + taskId);
        TaskOrder taskOrder = new TaskOrder();
        taskOrder.setOpenId(openId);
        taskOrder.setCreateTime(CreateOrderID.getCurrentTime());
        taskOrder.setState(0);
        Task task = new Task();
        task = taskService.get(taskId);
        taskOrder.setTask(task);
        long id = taskOrderService.save(taskOrder);
        if (id > 0) {
            map.put("msg", "执行成功");
            map.put("code", "200");
            return map;
        }
        map.put("msg", "添加失败");
        map.put("code", "500");
        return map;
    }

    //查询任务的完成记录
    @RequestMapping(value = "taskOrderByTaskId", method = RequestMethod.GET)
    @ResponseBody
    public Map findAllTask(Long taskID, int page, int pageSize) {
        Map map = new HashMap();
        List<TaskOrder> taskOrders = null;
        try {
            taskOrders = taskOrderService.findAllTaskOrder(taskID, page, pageSize);
        } catch (Exception e) {
            e.printStackTrace();
        }
        map.put("content", taskOrders);
        map.put("msg", "执行成功！");
        return map;
    }

    //查询当前用户的所有任务记录
    @RequestMapping(value = "taskOrderByOpenId", method = RequestMethod.GET)
    @ResponseBody
    public Map findAllTask(String openId, int state, int page, int pageSize) {
        Map map = new HashMap();
        List<TaskOrder> taskOrders = null;
        try {
            taskOrders = taskOrderService.taskOrderByOpenId(openId, state, page, pageSize);
        } catch (Exception e) {
            e.printStackTrace();
        }
        map.put("content", taskOrders);
        map.put("msg", "执行成功！");
        return map;
    }


}
