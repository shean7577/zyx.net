<?php

namespace Home\Controller;

use Think\Controller;

class CommonController extends Controller
{
    public function ao($d)
    {
        $res = [
            "status" => ($d && $d !== '') ? '10101' : '20202',
            "data" => $d
        ];
        $this->ajaxReturn($res);
    }

    public function ai()
    {
        // 获取 Fetch 请求的原始数据
        $data = file_get_contents('php://input');
        // 如果请求的 Content-Type 是 application/json，则解析 JSON 数据
        if (isset($_SERVER['CONTENT_TYPE']) && $_SERVER['CONTENT_TYPE'] === 'application/json') {
            $decodedData = json_decode($data, true);

            if (json_last_error() === JSON_ERROR_NONE) {
                return $decodedData;
            } else {
                // 错误处理
                return null;
            }
        } else {
            // 处理其他类型的数据或错误处理
            return null;
        }
    }
}
