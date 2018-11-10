package com.ssh.controller;

import com.ssh.entity.ImgsTask;
import com.ssh.entity.Task;
import com.ssh.service.TaskService;
import com.ssh.utils.CreateOrderID;
import io.swagger.annotations.ApiImplicitParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequestMapping(value = "/task")
public class TaskController {
    @Autowired
    private TaskService taskService;


    //添加任务
    @RequestMapping(value = "createTask", method = RequestMethod.GET)
    @ResponseBody
    public Map register(String name,
                        Double commission,
                        String article,
                        int totalNo,
                        @RequestParam(value = "taskImgs[]", required = false, defaultValue = "") String[] taskImgs

    ) {
        Map map = new HashMap();
        Task task = new Task();
        Set<ImgsTask> imgsTask = new HashSet<ImgsTask>();
        task.setName(name);
        task.setCommission(commission);
        task.setArticle(article);
        task.setTotalNo(totalNo);
        task.setCreateTime(CreateOrderID.getCurrentTime());
        System.out.println(name + commission + article + totalNo + taskImgs);

        for (int i = 0; i < taskImgs.length; i++) {
            ImgsTask img = new ImgsTask();
            img.setUrl(taskImgs[i]);
            imgsTask.add(img);
            img.setTask(task);
        }
        task.setTaskImgs(imgsTask);
        long id = taskService.save(task);
        if (id > 0) {
            map.put("msg", "执行成功！");
            map.put("code", "200");
            return map;
        }
        map.put("msg", "添加失败");
        map.put("code", "500");
        return map;
    }


    @ApiImplicitParams({})
    @RequestMapping(value = "findAllTask", method = RequestMethod.GET)
    @ResponseBody
    public Map findAllTask(int state, int page, int pageSize) {
        Map map = new HashMap();
        List<Task> tasks = null;
        try {
            tasks = taskService.findAllTask(state, page, pageSize);
        } catch (Exception e) {
            e.printStackTrace();
        }
        map.put("content", tasks);
        map.put("msg", "执行成功！");
        return map;
    }


}
