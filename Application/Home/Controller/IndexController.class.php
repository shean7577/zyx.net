<?php

namespace Home\Controller;

use \Home\Controller\CommonController;

class IndexController extends CommonController
{
    public function index()
    {
        $this->show('<div style="display:flex;align-items:center;text-align:center;height:100vh;width:100%;"><div style="flex:1;"><span style="font-size:larger;">zhangyixuan.net</span><br/><span style="font-size:smaller;">wellcomes you</span></div></div>');
    }

    /**
     * create shean manager
     */
    public function createManager()
    {
        $data = [
            "name" => "user",
            "pswd" => md5("zhangchen"),
            "mail" => "@",
            "site" => "zhangyixuan.net",
            "level" => 100,
            "integral" => 5000,
            "type" => "member"
        ];
        $d = M('user')->add($data);
        //$this->ajaxReturn($d);
        $this->ao($d);
    }

    /**
     * 会员管理 - 列表
     */
    public function memberMGR_list()
    {
        $this->ao(M('user')->select());
    }

    /**
     * 会员登录
     */
    public function memberLogin()
    {
        $fd = $this->ai();
        $member = M('user')->where($fd)->find();
        $this->ao(["id" => $member['id'], "type" => $member['type'], "name" => $member['name']]);
    }
}
