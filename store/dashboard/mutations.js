export default {
  // For Users
  setDashboardUserLocation (state, dashboardUserLocation) {
    state.dashboardUserLocation = dashboardUserLocation
  },
  setDashboardUserStatusChartDate (state, dashboardUserStatusChartDate) {
    state.dashboardUserStatusChartDate = dashboardUserStatusChartDate
  },
  setDashboardUserStatusChartSeries (state, dashboardUserStatusChartSeries) {
    state.dashboardUserStatusChartSeries = dashboardUserStatusChartSeries
  },
  setUserMoreOrLess (state, userMoreOrLess) {
    state.userMoreOrLess = userMoreOrLess
  },
  setReadNotification(state, readNotification) {
    state.readNotification = readNotification
  },
  setNewUser(state, newUser) {
    state.newUser = newUser
  },
  setInActiveUser(state, inActiveUser) {
    state.inActiveUser = inActiveUser
  },
  setActiveUser(state, activeUser) {
    state.activeUser = activeUser
  },
  setCompareNotification(state, compareNotification) {
    state.compareNotification = compareNotification
  },
  setCompareUser(state, compareUser) {
    state.compareUser = compareUser
  },
  setCompareInactiveUser(state, compareInActiveUser) {
    state.compareInActiveUser = compareInActiveUser
  },
  setUserNotificationChart(state, userNotificationChart) {
    state.userNotificationChart = userNotificationChart
  },
  setUserStatusChart(state, userStatusChart) {
    state.userStatusChart = userStatusChart
  },
  setMonthlyUserNotificationDate(state, monthlyUserNotificationDate) {
    state.monthlyUserNotificationDate = monthlyUserNotificationDate
  },
  setMonthlyUserNotificationSeries(state, monthlyUserNotificationSeries) {
    state.monthlyUserNotificationSeries = monthlyUserNotificationSeries
  },
  setWeeklyUserNotificationDate(state, weeklyUserNotificationDate) {
    state.weeklyUserNotificationDate = weeklyUserNotificationDate
  },
  setWeeklyUserNotificationSeries(state, weeklyUserNotificationSeries) {
    state.weeklyUserNotificationSeries = weeklyUserNotificationSeries
  },

  //For Devices

  setDashboardDeviceStatus(state, dashboardDeviceStatus) {
    state.dashboardDeviceStatus = dashboardDeviceStatus
  },
  setDashboardDeviceLogChartDate(state, dashboardDeviceLogChartDate) {
    state.dashboardDeviceLogChartDate = dashboardDeviceLogChartDate
  },
  setDashboardDeviceLogChartSeries(state, dashboardDeviceLogChartSeries) {
    state.dashboardDeviceLogChartSeries = dashboardDeviceLogChartSeries
  },
  setDeviceMoreOrLess(state, deviceMoreOrLess) {
    state.deviceMoreOrLess = deviceMoreOrLess
  },

  setDeviceAvgRuntime(state, deviceAvgRuntime) {
    state.deviceAvgRuntime = deviceAvgRuntime
  },

  setNewDevice(state, newDevice) {
    state.newDevice = newDevice
  },
  setActiveDevice(state, activeDevice) {
    state.activeDevice = activeDevice
  },
  setDefectDevice(state, defectDevice) {
    state.defectDevice = defectDevice
  },
  setCompareDeviceAvgRuntime(state, compareDeviceAvgRuntime) {
    state.compareDeviceAvgRuntime = compareDeviceAvgRuntime
  },
  setCompareDevice(state, compareDevice) {
    state.compareDevice = compareDevice
  },
  setCompareDefectDevice(state, compareDefectDevice) {
    state.compareDefectDevice = compareDefectDevice
  },
  setDeviceLogChart(state, deviceLogChart) {
    state.deviceLogChart = deviceLogChart
  },
  setDeviceWeeklyTempoSeries(state, deviceWeeklyTempoSeries) {
    state.deviceWeeklyTempoSeries = deviceWeeklyTempoSeries
  },
  setDeviceDailyTempoSeries(state, deviceDailyTempoSeries) {
    state.deviceDailyTempoSeries = deviceDailyTempoSeries
  },
  setDeviceWeeklyTempoDate(state, deviceWeeklyTempoDate) {
    state.deviceWeeklyTempoDate = deviceWeeklyTempoDate
  },
  setDeviceDailyTempoDate(state, deviceDailyTempoDate) {
    state.deviceDailyTempoDate = deviceDailyTempoDate
  },

  setFilteredDashboardData(state, filteredDashboardData) {
    state.filteredDashboardData = filteredDashboardData
  }
}
