var React = require('react-native');

var {
	View,
	Text,
	TouchableHighlight,
} = React;

module.exports = React.createClass({
	render: function() {
		var data = this.props.data;
		var name = data;
		return (
			<TouchableHighlight onPress={this.props.onSelect} underlayColor={'#eeeeee'}>
				<View style={Style.container}>
					<Image style={Style.avatar}
					source={{
						uri: avatar_url
					}} />

					<View style={Style.topic}>
						<Text style={Style.title}>
							{data.title}
						</Text>
						{this.renderInfo()}
					</View>

					{this.renderCommentCount()}
				</View>
			</TouchableHighlight>
		);
	},

	renderCommentCount: function() {
		var data = this.props.data;
		if (data.replies_count) {
			var comment_width = 24 + data.replies_count.toString().length * 8;
			return (
				<View style={Style.replyNumWrapper}>
						<View style={[Style.replyNum, {width: comment_width}]}>
							<Text style={Style.replyNumText}>{data.replies_count}</Text>
						</View>
					</View>
			);
		}
		return;
	},

	renderInfo: function() {
		var data = this.props.data;
		return (
			<Text style={Style.info}>
							<Text style={Style.node_name}>{data.node_name}</Text> • 
						</Text>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	rightContainer: {
		flex: 1,
	},
	thumbnail: {
		width: 53,
		height: 81,
	},
	title: {
		fontSize: 20,
		marginBottom: 8,
		textAlign: 'center',
	},
	year: {
		textAlign: 'center',
	},
	listView: {
		paddingTop: 84,
		backgroundColor: '#F5FCFF',
	},
});