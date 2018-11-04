package com.ssh.wxpay.constant;

/**
 * Created by Hyman on 2017/2/27.
 */
public class Constant {

    public static final String DOMAIN = "https://www.tulaoda.top";

    public static final String APP_ID = "wx842944599fa4c887";

    public static final String APP_SECRET = "947ded932d6a7e2896cdc826e6b2beff";

    public static final String APP_KEY = "869e66a03137f4704c49e113797c0dfa";

    public static final String MCH_ID = "1514341351";  //商户号

    public static final String URL_UNIFIED_ORDER = "https://api.mch.weixin.qq.com/pay/unifiedorder";

    public static final String URL_NOTIFY = Constant.DOMAIN + "/wxpay/views/payInfo.jsp";

    public static final String TIME_FORMAT = "yyyyMMddHHmmss";

    public static final int TIME_EXPIRE = 2;  //单位是day

}
