import { browserHistory, createMemoryHistory } from 'react-router'
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment'

function createHistory() {
  return ExecutionEnvironment.canUseDOM
    ? browserHistory
    : createMemoryHistory()
}

export default createHistory()
