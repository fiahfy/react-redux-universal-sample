import {browserHistory, createMemoryHistory} from 'react-router'
import withScroll from 'scroll-behavior'
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment'

function createHistory() {
  return ExecutionEnvironment.canUseDOM
    ? withScroll(browserHistory)
    : createMemoryHistory()
}

export default createHistory()
