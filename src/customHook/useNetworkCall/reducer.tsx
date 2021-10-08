type responseType = {
	question: string;
	answer: string;
};

export type StateType = {
	status: null | string;
	response: null | string | responseType;
};

type InitFetchAction = {
	type: 'FETCHING';
};

type SetFetchAction = {
	type: 'SUCCESS' | 'ERROR';
	payload: null | string | responseType;
};

type betterAction = InitFetchAction | SetFetchAction;

export const initialState = {
	status: null,
	response: null,
	error: '',
};

const reducer = (state: StateType, action: betterAction) => {
	switch (action.type) {
		case 'FETCHING':
			return { ...initialState, status: action.type };

		case 'SUCCESS':
			return { ...state, status: action.type, response: action.payload };

		case 'ERROR':
			return { ...state, status: action.type, response: action.payload };

		default:
			return state;
	}
};

export default reducer;
