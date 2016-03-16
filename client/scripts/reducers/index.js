import { combineReducers } from 'redux'
import uiReducer from './ui_reducer'

const context = (state, action) => {
  return {
    chores: [],
    finances: {
      payment: [],
      bills: []
    },
    landlordMessages: [],
    messages: [],
    counters: {
      messages: 4,
      chores: 1,
      contact_landlord: 7,
      finances: 5
    }
  }
}

const rootReducer = combineReducers({
  ui: uiReducer,
  context
});

export default rootReducer


/*
exapmle state:

state = {
  ui: {
    isLandlord: boolean,
    currentView: {
      render: 'house_info',
      text: 'House Info'
    },
    username: string,
    house: {
      code: string,
      name: string
    }
  },
  context: {
    chores: Array of chore objects,
    finances: {
      payment: Array of payment objects,
      bills: Array of bill objects
    },
    landlordMessages: Array of message objects,
    counters: {
      messages: Number,
      chores: Number,
      contact_landlord: Number,
      finances: Number
    }
  }
}

*/