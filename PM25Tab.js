var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} = React;

var facemash = React.createClass({
  getInitialState() {
      return {
        selectedTab: 'faceMash'
      }
    },
    render: function() {
      return (
        <TabBarIOS>
        <TabBarIOS.Item
          title = "FaceMash"
          icon = { require('image!facemash') }
          selected={ this.state.selectedTab === 'faceMash' }>
          <View style={ styles.pageView }>
            <Text>Face Mash</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Messages"
          icon={ require('image!messages') }
          selected={ this.state.selectedTab === 'messages' }>
          <View style={ styles.pageView }>
            <Text>Messages</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Settings"
          icon={ require('image!settings') }
          selected={ this.state.selectedTab === 'settings' }>
          <View style={ styles.pageView }>
            <Text>Settings</Text>
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
      );
    }
});
var styles = StyleSheet.create({
  pageView: {
    backgroundColor: '#fff',
    flex: 1
  }
});
// omitted code