'use strict';
var React = require('react-native');
//var TabNavigator = require('./node_modules/react-native/node_modules/react-native-tab-navigator');
//import TabNavigator from './node_modules/react-native/node_modules/react-native-tab-navigator';
var {
	AppRegistry,
	StyleSheet,
	Text,
	Image,
	View,
	TabBarIOS,
	NavigatorIOS,
} = React;

var SearchPage = require('./App/Views/Home/SearchPage');
var Nodes = require('./App/Views/Home/Home');
var About = require('./App/Views/Home/About');

var styles = React.StyleSheet.create({
	text: {
		color: 'black',
		backgroundColor: 'red',
		marginLeft: 20,
		marginTop: 80,
		marginRight: 200,
		textAlign: 'center',
	},
	container: {
		flex: 1,
		backgroundColor: '#E7EAEC'
	},
	navigator: {
		backgroundColor: '#E7EAEC'
	},
	TabBarImage: {
		width: 17,
		height: 17
	}
});

var PropertyFinderApp = React.createClass({
	getInitialState: function() {
		return {
			selectedTab: 'Search'
		};
	},
	render: function() {
		return (
			<TabBarIOS selectedTab={this.state.selectedTab}>
            <TabBarIOS.Item accessibilityLabel={"Search"}
                selected={this.state.selectedTab === 'Search'}
                title="搜搜PM2.5"
                name="Search"
                icon={require('image!tabbar_discover')}
                onPress={() => {
                    this.setState({
                      selectedTab: 'Search'
                    });
                }}>
                <NavigatorIOS style={styles.container}
                    tintColor={'#333344'}
                    initialRoute={{
                      title: '搜搜PM2.5',
                      component: SearchPage
                    }}
                    itemWrapperStyle={styles.navigator} />
            </TabBarIOS.Item>

            <TabBarIOS.Item accessibilityLabel={"Nodes"}
                selected={this.state.selectedTab === 'nodes'}
                title="城市信息"
                name="nodes"
                icon={require('image!tabbar_mainframe')}
                onPress={() => {
                    this.setState({
                      selectedTab: 'nodes'
                    });
                }}>
                <NavigatorIOS style={styles.container}
                    tintColor={'#333344'}
                    initialRoute={{
                      title: '城市信息',
                      component: Nodes
                    }}
                    itemWrapperStyle={styles.navigator} />

            </TabBarIOS.Item>
            <TabBarIOS.Item accessibilityLabel={"About"}
                selected={this.state.selectedTab === 'about'}
                title="关于"
                name="about"
                icon={require('image!tabbar_me')}
                selectedIcon={{uri:'tabbarHL'}}
                onPress={() => {
                    this.setState({
                      selectedTab: 'about'
                    });
                }}>
                <NavigatorIOS style={styles.container}
                    tintColor={'#333344'}
                    initialRoute={{
                      title: '关于',
                      component: About
                    }}
                    itemWrapperStyle={styles.navigator} />
            </TabBarIOS.Item>
        </TabBarIOS>
		);
	}
});

AppRegistry.registerComponent('sosoPM2.5', () => PropertyFinderApp);

// class PropertyFinderApp extends React.Component {
// 	render() {
// 		return (
// 			<React.NavigatorIOS style = {styles.container} 
// 			initialRoute = {{title:'搜搜PM2.5',component:SearchPage,}} />
// 		);
// 	}
// });