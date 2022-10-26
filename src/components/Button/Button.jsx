import React from 'react'
import classNames from 'classnames/bind'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)


const Button = ({ children, className, ...passProps }) => {

    const customClass = cx('wrapper', { [className]: className })
    return (
        <button className={customClass} {...passProps}>{children}</button>
    )
}

export default Button