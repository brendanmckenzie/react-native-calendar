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
      return {
        month: moment().month(),
        year: moment().year()
      };
    },

    renderMonthView: function() {
      var daysRender = Days.map(function (d) {
        return (<Text style={styles.dayListDay}>{d}</Text>);
      });

      var month = moment();
      month.month(this.state.month);
      month.year(this.state.year);

      var firstDay = moment();
      firstDay.month(this.state.month);
      firstDay.year(this.state.year);
      firstDay.add({days: -firstDay.date() + 1});
      firstDay.add({days: -firstDay.day() - 1});

      var weekRows = [];

      for (var i = 0; i < 5; i++) {
        var days = [];
        for (var j = 0; j < 7; j++) {
          var currentDay = moment(firstDay.add({days: 1}));
          days.push((<TouchableOpacity onPress={this._selectDate.bind(this, currentDay)}><Text style={styles.dayListDay}>{currentDay.date()}</Text></TouchableOpacity>));
        }
        weekRows.push((
          <View style={styles.dayList}>
            {days}
          </View>));
      }

      return (
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', width: 5*50}}>
            <TouchableOpacity style={{flex: 0}} onPress={this._prevMonth}><Text style={{fontFamily: 'Open Sans'}}>Prev</Text></TouchableOpacity>
            <Text style={styles.title}>{month.format('MMMM')}</Text>
            <TouchableOpacity style={{flex: 0}} onPress={this._nextMonth}><Text style={{fontFamily: 'Open Sans'}}>Next</Text></TouchableOpacity>
          </View>

          <View style={styles.dayList}>
            {daysRender}
          </View>
          {weekRows}
        </View>);
    },

    render: function() {
      return this.renderMonthView();
    },

    _prevMonth: function () {
      var state = this.state;
      state.month--;
      if (state.month == 0) { state.month = 12; state.year--; }

      this.setState(state);
    },

    _nextMonth: function () {
      var state = this.state;
      state.month++;
      if (state.month == 13) { state.month = 1; state.year++; }

      this.setState(state);
    },

    _selectDate: function (date) {
      console.log(date);
    }
  });

  var styles = StyleSheet.create({
    title: {
      fontFamily: 'Open Sans',
      textAlign: 'center',
      flex: 2,
    },
    dayList: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    dayListDay: {
      fontFamily: 'Open Sans',
      padding: 5,
      width: 40,
      textAlign: 'center'
    }
  });

  module.exports = Calendar;

})(require('react-native'));
