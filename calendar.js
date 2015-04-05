(function (React) {
  'use strict';

  var {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } = React;

  var moment = require('moment');

  var Days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  var Calendar = React.createClass({
    getInitialState: function () {
      return {};
    },

    renderMonthView: function() {
      var daysRender = Days.map(function (d) {
        return (<Text style={styles.dayListDay}>{d}</Text>);
      });

      var weekRows = [];

      for (var i = 0; i < 5; i++) {
        var days = [];
        for (var j = 0; j < 7; j++) {
          var d = (i * 7) + j;
          days.push((<TouchableOpacity><Text style={styles.dayListDay}>{d}</Text></TouchableOpacity>));
        }
        weekRows.push((
          <View style={styles.dayList}>
            {days}
          </View>));
      }

      return (
        <View>
          <Text style={styles.title}>Calendar</Text>

          <View style={styles.dayList}>
            {daysRender}
          </View>
          {weekRows}
        </View>);
    },

    render: function() {
      return this.renderMonthView();
    }
  });

  var styles = StyleSheet.create({
    title: {
      fontFamily: 'Open Sans',
      textAlign: 'center',
    },
    dayList: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    dayListDay: {
      fontFamily: 'Open Sans',
      padding: 5,
      flex: 1
    }
  });

  module.exports = Calendar;

})(require('react-native'));
