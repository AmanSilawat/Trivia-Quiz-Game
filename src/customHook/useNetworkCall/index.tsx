// import axios from 'axios';
import axios from 'axios';
import { useReducer, useCallback } from 'react';
import reducer, { initialState } from './reducer';

const useNetworkCall = (endPoint: string) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const networkRequest = useCallback(async () => {
		dispatch({ type: 'FETCHING' });
		try {
			const response = await axios.get(endPoint);
			dispatch({ type: 'SUCCESS', payload: response.data[0] });
		} catch (error: any) {
			dispatch({ type: 'ERROR', payload: error.message });
		}
	}, [endPoint]);

	return { state, networkRequest };
};

export default useNetworkCall;
