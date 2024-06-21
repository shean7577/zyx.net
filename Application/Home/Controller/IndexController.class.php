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
    /**
     * 用ID获取用户信息
     */
    public function memberData()
    {
        $fd = $this->ai();
        $member = M('user')->where($fd)->find();
        $this->ao([
            "name" => $member['name'],
            "mail" => $member['mail'],
            "site" => $member['site'],
            "level" => $member['level'],
            "integral" => $member['integral'],
            "type" => $member['type']
        ]);
    }

    /**
     * 会员列表
     */
    public function memberList()
    {
        $fd = $this->ai();
        $start = $fd['currentPage'] - 1;
        $end = $start + $fd['pageSize'];
        $member = M('user')->limit($start, $end)->select();
        $this->ao($member);
    }
    /**
     * 会员数据更新
     */
    public function memberUpdate()
    {
        $fd = $this->ai();
        $member = M('user')->where("id='" . $fd["id"] . "'")->save($fd);
        $this->ao($member);
    }
    /**
     * 所有分类
     */
    public function menuList()
    {
        $this->ao(M('menu')->select());
    }
}
