'use strict';

var React = require('react-native');
var WebView = require('./WebView');
var cityUrl;
var {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	ActivityIndicatorIOS,
	Image,
	Component
} = React;

var DEFAULT_MAP_URL = 'http://maps.google.com/maps/api/geocode/json?sensor=true_or_false&latlng=';
var UserDefaultManage = require('NativeModules').UserDefaultManage;

var PM25COM = 'http://m.pm25.com/wap/city/';
var pm25Data = {
	"葫芦岛": "huludao",
	"泉州": "quanzhou",
	"赤峰": "chifeng",
	"营口": "yingkou",
	"大连": "dalian",
	"瓦房店": "wafangdian",
	"厦门": "xiamen",
	"湛江": "zhanjiang",
	"盘锦": "panjin",
	"海口": "haikou",
	"蓬莱": "penglai",
	"吉林": "jilin",
	"汕头": "shantou",
	"福州": "fuzhou",
	"大庆": "daqing",
	"三亚": "sanya",
	"锦州": "jinzhou",
	"梅州": "meizhou",
	"深圳": "shenzhen",
	"舟山": "zhoushan",
	"秦皇岛": "qinhuangdao",
	"肇庆": "zhaoqing",
	"烟台": "yantai",
	"哈尔滨": "haerbin",
	"承德": "chengde",
	"齐齐哈尔": "qiqihaer",
	"中山": "zhongshan",
	"珠海": "zhuhai",
	"阳江": "yangjiang",
	"玉溪": "yuxi",
	"西宁": "xining",
	"台州": "taizhou",
	"潮州": "chaozhou",
	"宁波": "ningbo",
	"荣成": "rongcheng",
	"乳山": "rushan",
	"张家口": "zhangjiakou",
	"抚顺": "fushun",
	"东莞": "dongguan",
	"泰安": "taian",
	"沈阳": "shenyang",
	"莱州": "laizhou",
	"云浮": "yunfu",
	"文登": "wendeng",
	"本溪": "benxi",
	"河源": "heyuan",
	"汕尾": "shanwei",
	"威海": "weihai",
	"揭阳": "jieyang",
	"温州": "wenzhou",
	"清远": "qingyuan",
	"平度": "pingdu",
	"曲靖": "qujing",
	"惠州": "huizhou",
	"北海": "beihai",
	"昆明": "kunming",
	"茂名": "maoming",
	"德州": "dezhou",
	"鞍山": "anshan",
	"招远": "zhaoyuan",
	"宝鸡": "baoji",
	"滨州": "binzhou",
	"银川": "yinchuan",
	"廊坊": "langfang",
	"北京": "beijing",
	"呼和浩特": "huhehaote",
	"丹东": "dandong",
	"长春": "changchun",
	"青岛": "qingdao",
	"金昌": "jinchang",
	"即墨": "jimo",
	"盐城": "yancheng",
	"大同": "datong",
	"韶关": "shaoguan",
	"莱西": "laixi",
	"洛阳": "luoyang",
	"长治": "changzhi",
	"上海": "shanghai",
	"开封": "kaifeng",
	"库尔勒": "kuerle",
	"重庆": "chongqing",
	"克拉玛依": "kelamayi",
	"嘉峪关": "jiayuguan",
	"柳州": "liuzhou",
	"咸阳": "xianyang",
	"莱芜": "laiwu",
	"天津": "tianjin",
	"太原": "taiyuan",
	"石家庄": "shijiazhuang",
	"济宁": "jining",
	"包头": "baotou",
	"宜宾": "yibin",
	"淄博": "zibo",
	"乌鲁木齐": "wulumuqi",
	"泸州": "luzhou",
	"自贡": "zigong",
	"唐山": "tangshan",
	"海门": "haimen",
	"江门": "jiangmen",
	"贵阳": "guiyang",
	"章丘": "zhangqiu",
	"邢台": "xingtai",
	"鄂尔多斯": "eerduosi",
	"广州": "guangzhou",
	"阳泉": "yangquan",
	"牡丹江": "mudanjiang",
	"三门峡": "sanmenxia",
	"南宁": "nanning",
	"吴江": "wujiang",
	"西安": "xian",
	"石嘴山": "shizuishan",
	"铜川": "tongchuan",
	"攀枝花": "panzhihua",
	"佛山": "foshan",
	"荆州": "jingzhou",
	"胶州": "jiaozhou",
	"枣庄": "zaozhuang",
	"平顶山": "pingdingshan",
	"胶南": "jiaonan",
	"兰州": "lanzhou",
	"遵义": "zunyi",
	"保定": "baoding",
	"昆山": "kunshan",
	"丽水": "lishui",
	"常熟": "changshu",
	"太仓": "taicang",
	"徐州": "xuzhou",
	"寿光": "shouguang",
	"绵阳": "mianyang",
	"东营": "dongying",
	"渭南": "weinan",
	"济南": "jinan",
	"延安": "yanan",
	"焦作": "jiaozuo",
	"郑州": "zhengzhou",
	"安阳": "anyang",
	"南通": "nantong",
	"邯郸": "handan",
	"潍坊": "weifang",
	"成都": "chengdu",
	"张家界": "zhangjiajie",
	"衢州": "quzhou",
	"衡水": "hengshui",
	"临汾": "linfen",
	"聊城": "liaocheng",
	"嘉兴": "jiaxing",
	"宜昌": "yichang",
	"菏泽": "heze",
	"桂林": "guilin",
	"江阴": "jiangyin",
	"张家港": "zhangjiagang",
	"常德": "changde",
	"宿迁": "suqian",
	"岳阳": "yueyang",
	"长沙": "changsha",
	"南充": "nanchong",
	"杭州": "hangzhou",
	"湘潭": "xiangtan",
	"沧州": "cangzhou",
	"拉萨": "lasa",
	"常州": "changzhou",
	"宜兴": "yixing",
	"苏州": "suzhou",
	"株洲": "zhuzhou",
	"南昌": "nanchang",
	"无锡": "wuxi",
	"淮安": "huaian",
	"富阳": "fuyang",
	"绍兴": "shaoxing",
	"临沂": "linyi",
	"湖州": "huzhou",
	"九江": "jiujiang",
	"泰州": "taizhoushi",
	"日照": "rizhao",
	"溧阳": "liyang",
	"德阳": "deyang",
	"临安": "linan",
	"连云港": "lianyungang",
	"金华": "jinhua",
	"义乌": "yiwu",
	"芜湖": "wuhu",
	"诸暨": "zhuji",
	"马鞍山": "maanshan",
	"金坛": "jintan",
	"武汉": "wuhan",
	"镇江": "zhenjiang",
	"南京": "nanjing",
	"扬州": "yangzhou",
	"句容": "jurong",
	"合肥": "hefei",
	"Santa Clara County": "hefei",
	"圣克拉拉": "hefei"
}

var styles = StyleSheet.create({
	description1: {
		marginBottom: 20,
		fontSize: 22,
		textAlign: 'center',
		color: '#656565'
	},
	description: {
		marginBottom: 20,
		fontSize: 18,
		textAlign: 'center',
		color: '#656565'
	},
	container: {
		padding: 30,
		marginTop: 65,
		alignItems: 'center'
	},
	flowRight: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch'
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	button: {
		height: 36,
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#48BBEC',
		borderColor: '#48BBEC',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	searchInput: {
		height: 36,
		padding: 4,
		marginRight: 5,
		flex: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#48BBEC',
		borderRadius: 8,
		color: '#48BBEC'
	},
	image: {
		width: 217,
		height: 138
	}
});

function urlForQueryAndPage(key, value) {
	console.log('key=' + key + value);
	if (key === 'place_name') {
		var querystring = pm25Data[value];
		if (querystring) {
			querystring = PM25COM+querystring+'.html';
			console.log('querystring = ' + querystring +' '+ querystring.length);
			if (querystring.length > 19) {
				return querystring;
			} else {
				return '';
			}
		};
	} else if (key === 'centre_point') {
		var murl = DEFAULT_MAP_URL + value;
		console.log('murl=' + murl);
		return murl;
	} else {
		return '';
	}
};

class SearchPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchString: '上海',
			isLoading: false,
			message: ''
		};
	}

	onSearchTextChanged(event) {
		console.log('onSearchTextChanged');
		this.setState({
			searchString: event.nativeEvent.text
		});
		console.log(this.state.searchString);
	}

	_handleResponse(results) {
		var address_components = results[3].address_components[0];
		var city = address_components['long_name'];

		this.setState({
			searchString: city,
			isLoading: false,
			message: ''
		});

		if (city && city.length) {
			console.log(city);
			cityUrl = pm25Data[city];
			cityUrl = PM25COM+cityUrl+'.html';
			console.log(cityUrl);
			if (cityUrl && cityUrl.length) {
				this._executeQuery(cityUrl);
			}
		} else {
			this.setState({
				message: 'Location not recognized; please try again.'
			});
			alert("没有找到输入的城市数据");
		}
	}

	_executeQuery(query) {

		this.setState({
			isLoading: false,
			message: ''
		});

		UserDefaultManage.addCityName(this.state.searchString, query);
		if (query && query.length) {
			this.props.navigator.push({
				title: this.state.searchString + "PM2.5详细信息",
				component: WebView,
				passProps: {
					url: query
				}
			});
		};
	}

	_executeLocationAddress(murl) {
		this.setState({
			isLoading: true,
			message: ''
		});

		if (murl.length) {
			// fetch(murl).then(function(res) {
			// 	if (res.ok) {
			// 		res.json().then(function(obj) {
			// 			// Get the JSON
			// 			console.log(obj.status);
			// 			var address_components = obj.results[3].address_components[0];
			// 			var city = address_components['long_name'];
			// 			console.log('city ' + city);
			// 		})
			// 	}
			// }, function(ex) {
			// 	console.log(ex)
			// });
			fetch(murl).then(response => response.json()).then(json => this._handleResponse(json.results)).catch(error => this.setState({
				isLoading: false,
				message: 'Something bad happened ' + error
			}));
			// fetch(murl)
			// 	.then((response) => response.json())
			// 	.then((responseData) => {
			// 		var address_components = responseData.results[3].address_components[0];
			// 		this.setState({
			// 			searchString: address_components['long_name'],
			// 			isLoading: false,
			// 			message: ''
			// 		});
			// 	})
			// 	.done();
		}
	}

	onSearchPressed() {
		var query = urlForQueryAndPage('place_name', this.state.searchString);
		this._executeQuery(query);
	}

	onLocationPressed() {
		navigator.geolocation.getCurrentPosition(
			location => {
				var search = location.coords.latitude + ',' + location.coords.longitude;
				console.log('search' + search);
				this.setState({
					searchString: search
				});
				var query = urlForQueryAndPage('centre_point', search);
				console.log('location ' + query);
				this._executeLocationAddress(query);
			},
			error => {
				this.setState({
					message: 'There was a problem with obtaining your locaton: ' + error
				});
				alert("获取位置信息失败！");
			});
	}

	render() {
		var spinner = this.state.isLoading ? (<ActivityIndicatorIOS hidden='true' size='large' />) : (<View/>);

		return (
			<View style={styles.container}>
        <Text style={styles.description1}>
          搜搜PM2.5
        </Text>
        <Text style={styles.description}>
          输入城市名称，查询城市的空气质量，例如输入：上海.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            placeholder='输入城市名称'
            value={this.state.searchString}
            onChange={this.onSearchTextChanged.bind(this)}/>
          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'
              onPress={this.onSearchPressed.bind(this)}>
            <Text style={styles.buttonText}>搜</Text>
          </TouchableHighlight>
        </View>

        <TouchableHighlight style={styles.button}
            onPress={this.onLocationPressed.bind(this)}
            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>我所在的位置</Text>
        </TouchableHighlight>

        <Image source={require('image!house')} style={styles.image}/>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
		);
	}
}

module.exports = SearchPage;