import React, { useContext, useEffect, useRef, useState } from 'react'

import { CommentContext } from '../../context/CommentState'

import { expandTextarea, validText } from '../../utils/functions'

import { Spinner } from '../includes/Spinner'

export function Edit() {

	const { state: { editLoad }, comment: { body }, startEditing, editComment } = useContext(CommentContext)

	const [value, setValue] = useState(body)

	const textRef = useRef()

	useEffect(() => {
		expandTextarea(textRef.current, 45)
	}, [])

	const expandText = e => {
		expandTextarea(e.target, 45)

		setValue(e.target.value)
	}

	const submitEdit = () => {
		if (!validText(value)) {
			editComment(value)
		}
	}

	return (
		<div className="comment_edit">
			<div className="edit_content">
				<textarea
					name="edit_content"
					value={value}
					placeholder="Edit away"
					maxLength="9999"
					spellCheck="false"
					className="edit_text comment_textarea"
					onChange={expandText}
					ref={textRef}
				>
				</textarea>
			</div>
			<div className="edit_actions">
				<div className='cac'>
					<button
						className='enspr_red_btn'
						type='button'
						value='cancel'
						onClick={() => startEditing()}
					>
						Cancel
					</button>
					<button
						className={`enspr_red_btn ${editLoad ? ' disabled' : ''}`}
						type='button'
						value='edit'
						disabled={editLoad ? true : false}
						onClick={() => submitEdit()}
					>
						{editLoad
							? <Spinner stroke="#fff" style={{ display: 'block', margin: '0 auto', width: '30px', height: '30px' }} />
							: 'Edit'
						}
					</button>
				</div>
			</div>
		</div>
	)
}