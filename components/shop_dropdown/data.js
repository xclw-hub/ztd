// 数据格式,数据中只需要包含以下字段和数据格式,开发者可以添加字段,比如id等等,不影响组件显示,
// 组件的返回结果是有菜单数组下标形式返回,
// 如果传入数据中有value,也会返回value,开发者可根据返回的下标获取所选中的菜单
/*
[
	{
		"name":"",	//字符串类型 选填项 菜单名称,如不填,则取第一个子菜单的name值,filter和radio类型则将设置为"筛选"
		"type":""	//字符串类型 必填项 可取值 hierarchy/filter/radio  hierarchy单/多层级菜单(最多三级); filter筛选多选菜单; radio筛选单选菜单
		"submenu":[	//对象数组类型 必填项 子菜单数据
			{
				"name":"",	//字符串类型 必填项 菜单名称
				"value":"",	//字符串类型 选填项 自定义内容,比如id等等,如果填写了,confirm返回的结果中将返回对应选中的value,若菜单无value字段则返回null,filter类型此字段无效果
				"submenu":[	//对象数组类型 必填项 子菜单数据
					{
						"name":"",	//字符串类型 必填项 菜单名称
						"value":"",	//字符串类型 选填项 自定义内容,比如id等等,如果填写了,confirm返回的结果中将返回对应选中的value,若菜单无value字段则返回null
						"submenu":[	//对象数组类型 必填项 子菜单数据 filter类型无效 
							{
								"name":"",	//字符串类型 必填项 菜单名称 hierarchy类型层级最多到此
								"value":"",	//字符串类型 选填项 自定义内容,比如id等等,如果填写了,confirm返回的结果中将返回对应选中的value,若菜单无value字段则返回null
							}
						]
					}
				]
			}
		]
	}
]
*/

//0.0.4版本起 返回结果将有两部分组成:
/*
{
	index:[],	//旧版本的下标数组形式
	value:[]	//菜单中的valve,结构和下标结果数组一样,只是把下标替换成了value而已
}
*/
// 以下演示数据中,我故意把value设置成跟name一样,只是为了方便演示,使示例更加易懂,实际使用时候value应该是一个标识,给后台识别所用的.
// 数据较长，请仔细查看。
export default [
	{
		"name":'不限地区',
		"type": 'radio',
		"submenu": [{
				"name": "省份",
					"submenu": [{
							"name": "不限",
							"value": "不限"
						},
						{
							"name": "天津",
							"value": "天津"
						},
						{
							"name": "上海",
							"value": "上海"
						},
						
						{
							"name": "重庆",
							"value": "重庆"
						},
						{
							"name": "天津",
							"value": "天津"
						},
						{
							"name": "上海",
							"value": "上海"
						},
						
						{
							"name": "重庆",
							"value": "重庆"
						},
						{
							"name": "天津",
							"value": "天津"
						},
						{
							"name": "上海",
							"value": "上海"
						},
						
						{
							"name": "重庆",
							"value": "重庆"
						}
					]
				},
				{
					"name": "城市",
					"submenu": [{
							"name": "不限",
							"value": "不限"
						},{
							"name": "厦门",
							"value": "厦门"
						},
						{
							"name": "深圳",
							"value": "深圳"
						},
						{
							"name": "成都",
							"value": "成都"
						},
						{
							"name": "长沙",
							"value": "长沙"
						},
						{
							"name": "杭州",
							"value": "杭州"
						},
						{
							"name": "武汉",
							"value": "武汉"
						},
						{
							"name": "西安",
							"value": "西安"
						},
						{
							"name": "哈尔滨",
							"value": "哈尔滨"
						},
						{
							"name": "长春",
							"value": "长春"
						},{
							"name": "大连",
							"value": "大连"
						},{
							"name": "济南",
							"value": "济南"
						},
					]
				},
		]
	},
	{
		"name":'不限价格',
		"type": 'editor',
	}

]

