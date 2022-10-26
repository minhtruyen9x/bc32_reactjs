import React from 'react'
import classNames from 'classnames/bind'
import styles from './InputGroup.module.scss'

const cx = classNames.bind(styles)

const InputGroup = ({ title, id, type = "text", required, onChange, ...passProp }) => {

    if (required) {
        passProp.required = true
    }

    return (
        <div className={cx("wrapper")}>
            <label htmlFor={id} className={cx('title')}>
                {title}
                {required && <sup className={cx("required")}>*</sup>}
            </label>
            <input  {...passProp} id={id} type={type} onChange={onChange} className={cx("input")} />
        </div>
    )
}

export default InputGroup