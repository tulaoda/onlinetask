package com.ssh.controller;

import com.ssh.entity.Task;
import com.ssh.service.TaskService;
import io.swagger.annotations.ApiImplicitParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/task")
public class TaskController {
    @Autowired
    private TaskService taskService;


    //添加任务
    @ApiImplicitParams({})
    @RequestMapping(value = "createTask", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public Map register(@RequestBody Task task) {
        Map map = new HashMap();
        long id = taskService.save(task);
        if (id > 0) {
            map.put("msg", "执行成功！");
            map.put("code", "200！");
            return map;
        }
        map.put("msg", "添加失败");
        map.put("code", "500");
        return map;
    }





}
