package com.ssh.controller;

import com.ssh.entity.Banner;
import com.ssh.service.BannerService;
import com.ssh.utils.ResponseData;
import com.ssh.utils.enums.ResultStatus;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/banner")
public class BannerController {
    @Autowired
    private BannerService bannerService;


    @RequestMapping(value = "addBanner", method = RequestMethod.GET)
    @ResponseBody
    public ResponseData addBanner(
            @RequestParam(value = "taskImgs[]", required = false, defaultValue = "") String[] taskImgs
    ) {
        ResponseData responseData = ResponseData.ok();
        for (String item : taskImgs) {
            Banner banner = new Banner();
            banner.setImgUrl(item);
            System.out.println(item);
            bannerService.save(banner);
        }
        return responseData;
    }


    @RequestMapping(value = "listBanner", method = RequestMethod.GET)
    @ResponseBody
    public Map listBanner() {
        Map<String, Object> map = new HashMap<String, Object>();
        List<Banner> list = bannerService.findAll();
        map.put("content", list);
        map.put("msg", ResultStatus.SUCCESS.getCode());
        return map;
    }


    @RequestMapping(value = "deleteBanner", method = RequestMethod.GET)
    @ResponseBody
    public ResponseData listBanner(Long id) {
        ResponseData responseData = ResponseData.ok();
        bannerService.delete(id);
        return responseData;
    }

}
