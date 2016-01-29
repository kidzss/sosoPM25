'use strict';
var React = require('react-native');

var {
	Text,
	View,
	ListView,
	TouchableHighlight,
	ActivityIndicatorIOS
} = React;

var SearchPage = require('./SearchPage');
var PM25COM = 'http://m.pm25.com/wap/city/';
var pm25Data = require('./cityList');

var WebView = require('./WebView');

var Style = React.StyleSheet.create({
	container: {
		backgroundColor: '#E7EAEC',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	listView: {
		marginTop: 65,
		marginBottom: 50
	},
	title: {
		flex: 1,
		fontSize: 18,
		marginBottom: 8,
		textAlign: 'center',
	},
	separator: {
		height: 1,
		backgroundColor: '#CCCCCC',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 10,
		backgroundColor: '#E7EAEC',
	},
});

var CACHE = [];

var CityList = React.createClass({
	getInitialState: function() {
		return {
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			}),
		};
	},
	componentDidMount: function() {
		this.fetchData();
	},

	cache: function(items) {
		for (var key in items) {
			CACHE.push(key);
		}
	},
	fetchData: function() {
		this.cache(pm25Data);

		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(CACHE),
		});
	},

	render: function() {
		return this.renderCityList();
	},

	renderLoadingView: function() {
		return (
			<View style={Style.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
		);
	},

	renderCityList: function() {
		return (
			<ListView
			style={Style.listView}
	        ref="listview"
	        dataSource={this.state.dataSource}
	        renderRow={this._renderRow}
	        automaticallyAdjustContentInsets={false}
	        showsVerticalScrollIndicator={false} />
		);
	},

	_renderRow: function(rowData: string, sectionID: number, rowID: number) {
		return (
			<TouchableHighlight onPress={() => this.selectCity(rowID)}>
        <View>
          <View style={Style.row}>
            <Text style={Style.title}>
              {rowData}
            </Text>
          </View>
          <View style={Style.separator} />
        </View>
      </TouchableHighlight>
		);
	},

	selectCity: function(data) {
		var city = CACHE[data];
		var pinyin = pm25Data[city];

		var url = PM25COM + pinyin + '.html';
		this.props.navigator.push({
			title: city + "PM2.5详细信息",
			component: WebView,
			passProps: {
				url: url
			}
		});
	},
});

module.exports = CityList;