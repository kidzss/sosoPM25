'use strict';
var React = require('react-native');

var {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
} = React;

var MOCKED_MOVIES_DATA = [{
    title: 'Title',
    year: '2015',
    posters: {
        thumbnail: 'http://i.imgur.com/UePbdph.jpg'
    }
}, ];

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

var ListViewSimpleExample = React.createClass({
    // statics: {
    //     title: '<ListView> - Simple',
    //     description: 'Performant, scrollable list of data.'
    // },
    // getInitialState: function() {
    //     var ds = new ListView.DataSource({
    //         rowHasChanged: (r1, r2) => r1 !== r2
    //     });
    //     return {
    //         dataSource: ds.cloneWithRows(this._genRows({})),
    //     };
    // },

    // _pressData: ({}: {
    //     [key: number]: boolean
    // }),

    // componentWillMount: function() {
    //     this._pressData = {};
    // },

    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
    },

    fetchData: function() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                    loaded: true,
                });
            })
            .done();
    },

    componentDidMount: function() {
        this.fetchData();
    },

    render: function() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
        );
    },

    renderLoadingView: function() {
        return (
            <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
        );
    },

    renderMovie: function(movie) {
        return (
            <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
        );
    },
    // render: function() {
    //     var movie = MOCKED_MOVIES_DATA[0];
    //     return (
    //         <View style = {styles.container}>
    //             <Image
    //                 source = {{uri: movie.posters.thumbnail}}
    //                 style = {styles.thumbnail}
    //             />
    //             <View style = {styles.rightContainer}>
    //                 <Text style = {styles.title}>{movie.title}</Text>
    //                 <Text style = {styles.year}>{movie.year}</Text>
    //             </View>
    //         </View>
    //     );
    // },

    // _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    //     var rowHash = Math.abs(hashCode(rowData));
    //     var imgSource = {
    //         uri: THUMB_URLS[rowHash % THUMB_URLS.length],
    //     };
    //     return (
    //         <TouchableHighlight onPress={() => this._pressRow(rowID)}>
    //     <View>
    //       <View style={styles.row}>
    //         <Image style={styles.thumb} source={imgSource} />
    //         <Text style={styles.text}>
    //           {rowData + ' - ' + LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
    //         </Text>
    //       </View>
    //       <View style={styles.separator} />
    //     </View>
    //   </TouchableHighlight>
    //     );
    // },

    // _genRows: function(pressData: {
    //     [key: number]: boolean
    // }): Array < string > {
    //     var dataBlob = [];
    //     for (var ii = 0; ii < 100; ii++) {
    //         var pressedText = pressData[ii] ? ' (pressed)' : '';
    //         dataBlob.push('Row ' + ii + pressedText);
    //     }
    //     return dataBlob;
    // },

    // _pressRow: function(rowID: number) {
    //     this._pressData[rowID] = !this._pressData[rowID];
    //     this.setState({
    //         dataSource: this.state.dataSource.cloneWithRows(
    //             this._genRows(this._pressData)
    //         )
    //     });
    // },
});

// var THUMB_URLS = ['https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851549_767334479959628_274486868_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851561_767334496626293_1958532586_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851579_767334503292959_179092627_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851589_767334513292958_1747022277_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851563_767334559959620_1193692107_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851593_767334566626286_1953955109_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851591_767334523292957_797560749_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851567_767334529959623_843148472_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851548_767334489959627_794462220_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851575_767334539959622_441598241_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851573_767334549959621_534583464_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851583_767334573292952_1519550680_n.png'];
// var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.';
// /* eslint no-bitwise: 0 */

// var hashCode = function(str) {
//     var hash = 15;
//     for (var ii = str.length - 1; ii >= 0; ii--) {
//         hash = ((hash << 5) - hash) + str.charCodeAt(ii);
//     }
//     return hash;
// };

// var styles = StyleSheet.create({
//     row: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         padding: 10,
//         backgroundColor: '#F6F6F6',
//     },
//     separator: {
//         height: 1,
//         backgroundColor: '#CCCCCC',
//     },
//     thumb: {
//         width: 64,
//         height: 64,
//     },
//     text: {
//         flex: 1,
//     },
// });

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

module.exports = ListViewSimpleExample;