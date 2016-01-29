'use strict';

var React = require('react-native');

var NewsDetail = require('./SingleDetail');
var LoadingView = require('./Loading');

var {
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Navigator
} = React;

var NEWS_LIST_API_URL = 'http://88.studyteam.sinaapp.com/rnn/news_list.json';

var ListPage = React.createClass({

    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => (row1 !== row2)
            }),
            loaded: false
        }
    },

    // 该函数应该是该组件加载完毕，自动会调用的方法
    componentDidMount: function() {
        this.fetchData();
    },

    fetchData: function() {
        // fetch方法chrome最新版已经支持了，自然react native也是支持的
        fetch(NEWS_LIST_API_URL)
            .then((response) => response.json()) // 这是将后台以json传过来的数据，转成JS对象可以使用的object
            .then((responseData) => {
                console.log(responseData);
                // responseData就已经是可以直接使用的JS对象了
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData),
                    loaded: true
                });
            }).done();
    },

    render: function() {
        if (!this.state.loaded) {
            return (
                <LoadingView />
            );
        }
        return (
            <ListView 
            dataSource={this.state.dataSource}
            renderRow={this.renderNews}
            style={styles.listView} />
        );
    },

    renderNews: function(news, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={()=>this.onPress(news)}>
                <View style={styles.pageContainer}>
                    <View style={[styles.container, styles.newsItemContainer]}>
                        <Image style={styles.newsPic} source={{uri:news.pic}} />
                        <View style={styles.rightContainer}>
                            <Text style={styles.newsTitle}>{news.title}</Text>
                            <Text style={styles.newsSummary}>{news.summary}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    },

    onPress: function(news) {
        this.props.navigator.push({
            title: 'News Detial',
            component: NewsDetail,
            passProps: {
                news
            }
        });
    }
});

var styles = StyleSheet.create({
    pageContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    rightContainer: {
        flex: 1,
    },
    newsItemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ebebeb',
    },
    listView: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: 'red'
    },
    newsPic: {
        width: 90,
        height: 60,
        margin: 10,
        marginLeft: 0,
    },
    newsTitle: {
        color: '#4f4f4f',
        fontSize: 16,
        textAlign: 'left',
    },
    newsSummary: {
        color: '#bababa',
        fontSize: 14,
        textAlign: 'left',
    },
});

module.exports = ListPage;