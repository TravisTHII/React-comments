import React, { createContext, useReducer } from 'react'
import ThreadReducer from './ThreadReducer'

import { THREAD } from './actions'

import { SEED } from '../data'

import { newComment } from '../utils/newComment'

const initialState = {
	total: 0,
	hasPinned: false,
	paging: {},
	pinned: {},
	comments: [],
	sort: 'newest',
	loading: false,
	sortLoad: false,
	moreLoad: false,
	postLoad: false,
	fetched: false,
	error: false,
	menu: {
		dispaly: false,
		commentRef: null,
		data: []
	},
	limit: 2,
	allComments: []
}

export const ThreadContext = createContext(initialState)

export const ThreadProvider = ({ children }) => {

	const [state, dispatch] = useReducer(ThreadReducer, initialState)

	const getThread = () => {
		try {

			dispatch({
				type: THREAD.LOAD_THREAD
			})

			setTimeout(() => {

				const total = SEED.comments.length
				const end = total <= state.limit

				const comments = end ? SEED.comments : SEED.comments.slice(0, state.limit)

				const cursor = (comments.lastIndexOf(comments[comments.length - 1]) + 1)

				dispatch({
					type: THREAD.GET_THREAD,
					payload: {
						...SEED,
						paging: {
							total,
							end,
							cursor
						},
						total,
						comments,
						allComments: SEED.comments
					}
				})

			}, 250);

		} catch (error) {


		}
	}

	const loadMoreComments = () => {
		try {

			if (!state.moreLoad) {

				dispatch({
					type: THREAD.LOAD_T_MORE
				})

				setTimeout(() => {

					const cursor = (state.comments.lastIndexOf(state.comments[state.comments.length - 1]) + 1)

					dispatch({
						type: THREAD.MORE_THREAD,
						payload: {
							comments: state.allComments.slice(cursor, (cursor + state.limit))
						}
					})

				}, 250)

			}

		} catch (error) {

		}
	}

	const postComment = (body, user) => {
		try {

			if (!state.postLoad) {

				const comment = newComment(user, body, Date.now())

				dispatch({
					type: THREAD.TP_LOAD
				})

				setTimeout(() => {

					dispatch({
						type: THREAD.POST_COMMENT,
						payload: {
							comment
						}
					})

				}, 250);

			}

		} catch (error) {

		}
	}

	return (
		<ThreadContext.Provider value={{
			state,
			getThread,
			postComment,
			loadMoreComments
		}}>
			{children}
		</ThreadContext.Provider>
	)
}