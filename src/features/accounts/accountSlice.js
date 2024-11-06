import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  loanAmt: 0,
  loanPurpose: '',
};

const account = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += Number(action.payload);
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        state.loanAmt = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state, action) {
      if (state.loanAmt <= 0) return;
      state.balance -= state.loanAmt;
      state.loanAmt = 0;
      state.loanPurpose = '';
    },
  },
});

export const { withdraw, requestLoan, payLoan } = account.actions;

export function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };

  return function (dispatch, getState) {
    //API call
    fetch(`https://api.frankfurter.app/latest?base=USD&symbols=${currency}`)
      .then(resp => resp.json())
      .then(data => {
        const convertedAmount = (amount * data.rates[currency]).toFixed(2);
        console.log(`${amount} = ${convertedAmount} `);
        dispatch({ type: 'account/deposit', payload: convertedAmount });
      });
  };
  //return action
}

export default account.reducer;

// export default function accountReducer(state = initialAccountState, action) {
//   switch (action.type) {
//     case 'account/deposit':
//       return { ...state, balance: state.balance + action.payload };
//     case 'account/withdraw':
//       return { ...state, balance: state.balance - action.payload };
//     case 'account/requestLoan':
//       return {
//         ...state,
//         loanAmt: action.payload.loanAmt,
//         loanPurpose: action.payload.loanPurpose,
//         balance: state.balance + action.payload.loanAmt,
//       };
//     case 'account/payLoan':
//       if (state.loanAmt)
//         return {
//           ...state,
//           loanAmt: 0,
//           loanPurpose: '',
//           balance: state.balance - state.loanAmt,
//         };
//       return state;
//     case 'account/loading':
//       return {
//         ...state,
//       };
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === 'USD') return { type: 'account/deposit', payload: amount };

//   return function (dispatch, getState) {
//     //API call
//     fetch(`https://api.frankfurter.app/latest?base=USD&symbols=${currency}`)
//       .then(resp => resp.json())
//       .then(data => {
//         const convertedAmount = (amount * data.rates[currency]).toFixed(2);
//         console.log(`${amount} = ${convertedAmount} `);
//         dispatch({ type: 'account/deposit', payload: convertedAmount });
//       });
//   };
//   //return action
// }

// export function withdraw(amount) {
//   return { type: 'account/withdraw', payload: amount };
// }
// export function requestLoan(loanAmt, loanPurpose) {
//   return {
//     type: 'account/requestLoan',
//     payload: { loanAmt, loanPurpose },
//   };
// }
// export function payLoan() {
//   return { type: 'account/payLoan' };
// }
