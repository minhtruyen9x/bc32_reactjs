import { Fragment, memo } from 'react'
import classNames from 'classnames/bind'
import styles from './SeatList.module.scss'
import SeatItem from '../SeatItem'

const cx = classNames.bind(styles)

const SeatList = ({ data, gapX = { position: 5, spacer: 1 }, gapY = { position: 5, spacer: 1 }, selectedSeats, handleSelected }) => {

    return (
        <div className={cx("wrapper")}>
            {data.map((row, index) => {
                return (
                    <Fragment key={index}>
                        {/* vị trị render có gap theo chiều x (row) thì thêm 1 row trống ở đó*/}
                        {index === gapX.position ?
                            <div className="row invisible d-none d-sm-block">r</div> :
                            ""}

                        <div className="row g-1">
                            <span className='col'>{row.hang}</span>
                            {row.danhSachGhe.map((ghe, index) => {
                                return (
                                    <Fragment key={index}>
                                        {/* vị trị render có gap theo chiều y (col) thì thêm 1 col trống ở đó*/}
                                        {gapY.position === index ?
                                            <div className="col invisible d-none d-sm-block">c</div> :
                                            ""}

                                        <div className="col">
                                            {row.hang ?
                                                <SeatItem
                                                    seat={ghe}
                                                    selectedSeats={selectedSeats}
                                                    onSelect={handleSelected}
                                                    isSelected={selectedSeats.find(selectedSeat => selectedSeat.soGhe === ghe.soGhe)}
                                                /> :
                                                <span>{ghe.soGhe}</span>
                                            }
                                        </div>
                                    </Fragment>)
                            })}
                        </div>
                    </Fragment>)
            })}
        </div>

    )
}

export default memo(SeatList)