package com.ssh.controller;

import com.ssh.entity.Result;
import io.swagger.annotations.Api;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Api(value = "upload")
@Controller
//@RequestMapping(value = "/upload")
public class UploadController {

    /**
     * 文件上传
     *
     * @param picture
     * @param request
     * @return
     */
    @RequestMapping(value = "/upload", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public Map upload(@RequestParam("picture") MultipartFile picture, HttpServletRequest request) {
        Map map = new HashMap();
        //获取文件在服务器的储存位置
        String path = "/home/wwwroot/default/web/upload";
        File filePath = new File(path);
        System.out.println("文件的保存路径：" + path);
        if (!filePath.exists() && !filePath.isDirectory()) {
            System.out.println("目录不存在，创建目录:" + filePath);
            filePath.mkdir();
        }

        //获取原始文件名称(包含格式)
        String originalFileName = picture.getOriginalFilename();
        System.out.println("原始文件名称：" + originalFileName);

        //获取文件类型，以最后一个`.`为标识
        String type = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
        System.out.println("文件类型：" + type);
        //获取文件名称（不包含格式）
        String name = originalFileName.substring(0, originalFileName.lastIndexOf("."));

        //设置文件新名称: 当前时间+文件名称（不包含格式）
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String date = sdf.format(d);
        String fileName = date + name + "." + type;
        System.out.println("新文件名称：" + fileName);

        //在指定路径下创建一个文件
        File targetFile = new File(path, fileName);
        String ThumbnailsPath = path + "/" + fileName;//上传路径
        //将文件保存到服务器指定位置
        try {
            picture.transferTo(targetFile);
            System.out.println("上传成功");
            //图片压缩
            Thumbnails.of(ThumbnailsPath).size(800, 600).toFile(ThumbnailsPath);
            //将文件在服务器的存储路径返回
            map.put("url", "http://www.tulaoda.top/web/upload/" + fileName);
            map.put("code", 200);
            return map;
//            return new Result(true, "http://www.tulaoda.top/web/upload/" + fileName);
        } catch (IOException e) {
            System.out.println("上传失败");
            e.printStackTrace();
            map.put("msg", "上传失败");
            map.put("code", 500);
            return map;
//            return new Result(false, "上传失败");
        }
    }


}
