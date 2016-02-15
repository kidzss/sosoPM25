'use strict';

var React = require('react-native');
var WebView = require('./WebView');
var pm25Data = require('./cityList');

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
		if (querystring && querystring.length) {
			querystring = PM25COM + querystring + '.html';
			console.log('querystring = ' + querystring + ' ' + querystring.length);
			if (querystring.length > 19) {
				return querystring;
			} else {
				React.AlertIOS.alert("提示", "没有找到输入的城市数据");
				return '';
			}
		} else {
			React.AlertIOS.alert("提示", "没有找到输入的城市数据");
		}
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
			if (cityUrl && cityUrl.length) {
				cityUrl = PM25COM + cityUrl + '.html';
				console.log(cityUrl);
				if (cityUrl && cityUrl.length) {
					this._executeQuery(cityUrl);
				}
			} else {
				React.AlertIOS.alert("提示", "没有找到输入的城市数据");
			}
		} else {
			React.AlertIOS.alert("提示", "没有找到输入的城市数据");
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
				//console.log('search' + search);
				this.setState({
					searchString: ''
				});
				var query = urlForQueryAndPage('centre_point', search);
				console.log('location ' + query);
				this._executeLocationAddress(query);
			},
			error => {
				this.setState({
					message: 'There was a problem with obtaining your locaton: ' + error
				});
				React.AlertIOS.alert("提示", "获取位置信息失败！");
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