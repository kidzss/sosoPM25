var React = require('react-native');
var {
  TouchableHighlight,
  Text,
  Image,
  View
} = React;

var Style = React.StyleSheet.create({
  container: {
    backgroundColor: '#E7EAEC',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 10
    padding: 10,
    marginTop: 65,
    alignItems: 'center'
  },
  ad1: {
    padding: 10,
    fontSize: 17,
    fontWeight: 'normal',
    textAlign: 'left'
  },
  ad: {
    padding: 10,
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'left'
  },
  titleTxt: {
    marginTop: 30,
    marginBottom: 100,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  // link: {
  //   marginTop: 20,
  //   color: '#356DD0',
  // },
  logo: {
    height: 138,
    width: 217,
  }
});

var About = React.createClass({
  render: function() {
    return (
      <View style={Style.container}>
        <Text style={Style.titleTxt}>
          sosoPM2.5
        </Text>
      <Image style={Style.logo} source={require('image!house')}  />
          <Text style={Style.ad1}>
            同呼吸共命运，关注健康，关注雾霾，点滴从你我做起。
          </Text>
          <Text style={Style.ad}>
            使用React-Native做了这个APP.使用了网络资源,如有问题联系:gtzhou16@163.com.
          </Text>
      </View>
    );
  },

  // _onPress: function(title, url) {
  //   this.props.navigator.push({
  //     title: title,
  //     component: require('../Web'),
  //     passProps: {
  //       url: url
  //     },
  //   });
  // }
});

module.exports = About;

// <TouchableHighlight onPress={() => this._onPress('gtzhou16@163.com', 'mailto://gtzhou16@163.com')}>
//           <Text style={Style.link}>
//             有任何问题请联系gtzhou16@163.com
//           </Text>
//         </TouchableHighlight>