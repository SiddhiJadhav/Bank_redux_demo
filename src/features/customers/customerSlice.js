import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  nationalId: '',
  createdAt: '',
};

const customer = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId, createdAt) {
        return {
          payload: { fullName, nationalId, createdAt },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateCustomerName(state, action) {
      state.fullName = action.payload.fullName;
    },
  },
});

export function createCustomer(fullName, nationalId) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

export default customer.reducer;

// export default function customerReducer(state = initialcustomerState, action) {
//   switch (action.type) {
//     case 'customer/createCustomer':
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalId: action.payload.nationalId,
//         createdAt: action.payload.createdAt,
//       };

//     default:
//       return state;
//   }
// }
