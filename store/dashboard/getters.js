export default {
  // For Dashboard Users
  getDashboardUserLocation (state) {
    return state.dashboardUserLocation
  },
  getDashboardUserStatusChartDate (state) {
    return state.dashboardUserStatusChartDate
  },
  getDashboardUserStatusChartSeries (state) {
    return state.dashboardUserStatusChartSeries
  },
  getUserMoreOrLess (state) {
    return state.userMoreOrLess
  },
  getReadNotification (state) {
    return state.readNotification
  },
  getNewUser(state) {
    return state.newUser
  },
  getInActiveUser(state) {
    return state.inActiveUser
  },
  getActiveUser(state) {
    return state.activeUser
  },
  getCompareNotification(state) {
    return state.compareNotification
  },
  getCompareUser(state) {
    return state.compareUser
  },
  getCompareInActiveUser(state) {
    return state.compareInActiveUser
  },
  getUserNotificationChart(state) {
    return state.userNotificationChart
  },
  getUserStatusChart(state) {
    return state.userStatusChart
  },
  getMonthlyUserNotificationDate(state) {
    return state.monthlyUserNotificationDate
  },
  getMonthlyUserNotificationSeries(state) {
    return  state.monthlyUserNotificationSeries
  },
  getWeeklyUserNotificationDate(state) {
    return  state.weeklyUserNotificationDate
  },
  getWeeklyUserNotificationSeries(state) {
    return  state.weeklyUserNotificationSeries
  },

  // For Dashboard Devices
  getDashboardDeviceStatus (state) {
    return state.dashboardDeviceStatus
  },
  getDashboardDeviceLogChartDate (state) {
    return state.dashboardDeviceLogChartDate
  },
  getDashboardDeviceLogChartSeries (state) {
    return state.dashboardDeviceLogChartSeries
  },
  getDeviceMoreOrLess (state) {
    return state.deviceMoreOrLess
  },
  getDeviceAvgRuntime (state) {
    return state.deviceAvgRuntime
  },
  getNewDevice (state) {
    return state.newDevice
  },
  getActiveDevice (state) {
    return state.activeDevice
  },
  getDefectDevice(state) {
    return state.defectDevice
  },
  getCompareDeviceAvgRuntime(state) {
    return state.compareDeviceAvgRuntime
  },
  getCompareDevice(state) {
    return state.compareDevice
  },
  getCompareDefectDevice(state) {
    return state.compareDefectDevice
  },
  getDeviceLogChart(state) {
    return state.deviceLogChart
  },

  getDeviceDailyTempoDate(state) {
    return state.deviceDailyTempoDate
  },
  getDeviceWeeklyTempoDate(state) {
    return state.deviceWeeklyTempoDate
  },
  getDeviceDailyTempoSeries(state) {
    return state.deviceDailyTempoSeries
  },
  getDeviceWeeklyTempoSeries(state) {
    return state.deviceWeeklyTempoSeries
  },

  getFilteredDashboardData(state) {
    return state.filteredDashboardData
  }
}
