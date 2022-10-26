import classNames from 'classnames/bind'
import styles from './SeatItem.module.scss'
const cx = classNames.bind(styles)

const SeatItem = ({ seat, onSelect, isSelected }) => {
    // tạo state lưu trữ giá trị selected
    console.log("SeatItem render")

    const classCustom = cx("seat", {
        'empty': isSelected && !seat.daDat,
        'reserved': seat.daDat,
        selected: isSelected
    })

    // ghế nào đã được đặt rồi thì không gắn hàm handleSelect vào onClick
    if (seat.daDat) {
        return <div className={classCustom} />
    }

    // ghế nào chưa đặt thì gắn hàm handleSelect vào onClick
    return <div className={classCustom} onClick={() => onSelect(seat)} />
}

export default SeatItem