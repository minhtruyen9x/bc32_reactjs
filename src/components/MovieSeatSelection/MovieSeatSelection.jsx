import React, { useRef, useState, useCallback } from 'react'
import classNames from 'classnames/bind'
import styles from './MovieSeatSelection.module.scss'
import InputGroup from '../InputGroup'
import Button from '../Button'
import danhSachGhe from '../../data/danhSachGhe.json'
import SeatList from '../SeatList/SeatList'
const cx = classNames.bind(styles)

const MovieSeatSelection = () => {
    // tạo state lưu thông tin danh sách các ghế nhận được khi gọi API
    const [data, setData] = useState(danhSachGhe)

    // tạo state lưu thông tin đặt vé
    const [orders, setOrders] = useState([])

    //  tạo state lưu giá trị các ô đang được select
    const [selectedSeats, setSelectedSeats] = useState([])

    // tạo state lưu thông tin khách hàng
    const [info, setInfo] = useState({ name: "", numberOfSeats: 0 })

    // tạo một cờ hiệu nhầm xem bước nhập thông tin khách hàng đã xong chưa
    const isSelectingSeats = useRef(false)

    // tạo một ref nhầm lưu giá trị thông tin số ghế người dùng muốn chọn
    const numberOfSeats = useRef(info.numberOfSeats)


    // hàm lưu thông tin người dùng nhập
    const handleChange = (evt) => {
        if (isSelectingSeats.current) return

        let { value, name, type } = evt.target
        if (type === "number") value = +value;
        setInfo({ ...info, [name]: value })
    }

    // hàm xác nhận đã nhập xong thông tin
    // chuyển qua bước chọn ghế
    const handleSave = (evt) => {
        evt.preventDefault()
        isSelectingSeats.current = true
        numberOfSeats.current = info.numberOfSeats
    }

    // hàm select ghế trong rạp
    // dùng useCallback để tránh render lại toàn bộ các cái ghế trong bảng
    // sau mỗi lần người dùng nhập thông tin
    const handleSelected = useCallback((seat) => {
        if (!isSelectingSeats.current) return
        const { daDat, ...seatInfo } = seat

        setSelectedSeats(prevState => {
            const isExist = prevState.findIndex(seat => seat.soGhe === seatInfo.soGhe)
            if (isExist === -1) {
                if (prevState.length === numberOfSeats.current) return prevState
                return [...prevState, seatInfo]
            }
            else {
                const newSelectedSeats = prevState.filter(seat => seat.soGhe !== seatInfo.soGhe)
                return newSelectedSeats
            }
        })
    }, [])

    // hàm xác nhận thông tin đặt vé của ngưởi dùng
    const handleSubmit = () => {
        // kiểm tra người dùng đã nhập đầy đủ thông tin hay không
        if (!isSelectingSeats.current) return
        if (selectedSeats.length < numberOfSeats.current) {
            alert("Chọn thêm ghế")
            return
        }

        // cập nhật thông tin đơn đặt vé rạp phim vào bảng
        setOrders([...orders, { name: info.name, seats: selectedSeats }])

        // cập nhật lại thông tin tình trạng các ghế
        setData(prev => {
            const newData = [...prev]
            selectedSeats.forEach(selectedSeat => {
                // tìm vị trí của selectedSeats trong  trong dữ liệu
                const hang = newData.find(row => row.hang === selectedSeat.soGhe.slice(0, 1))

                const ghe = hang.danhSachGhe.find(item => item.soGhe === selectedSeat.soGhe)
                ghe.daDat = true
            })
            return newData
        })

        // reset các giá trị người dùng đã thay đổi
        setInfo({ name: "", numberOfSeats: 0 })
        setSelectedSeats([])

        isSelectingSeats.current = false
    }
    console.log("MovieSeatSelection render")


    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("title")}>MOVIE SEAT SELECTION</h1>
            <div className={cx("content")}>
                <h3 className={cx("message")}>Fill The Required Details Below And Select Your Seats</h3>
                <form action="">
                    <div className="row">
                        <div className="col-6">
                            <InputGroup
                                value={info.name}
                                title="Name"
                                required
                                id="name"
                                spellCheck={false}
                                name="name"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <InputGroup
                                value={info.numberOfSeats}
                                type='number'
                                title="Number Of Seats"
                                required
                                id="number"
                                spellCheck={false}
                                name="numberOfSeats"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <Button className={cx("btn")} onClick={handleSave}>Start selecting</Button>
                </form>
                <div className={cx("status")}>
                    <div className={cx("status-box", "green")}>
                        Selected Seat
                    </div>
                    <div className={cx("status-box", "red")}>
                        Reserved Seat
                    </div>
                    <div className={cx("status-box", "empty")}>
                        Empty Seat
                    </div>
                </div>
                <SeatList data={data} selectedSeats={selectedSeats} handleSelected={handleSelected} />
                <h2 className={cx("screen")}>SCREEN THIS WAY</h2>
                <Button className={cx("btn")} onClick={handleSubmit}>Confirm Selection</Button>
                <div className="table-result">
                    <table className='table table-light table-striped table-hover'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Number of Seats</th>
                                <th>Seats</th>
                                <th>Total price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.name}</td>
                                    <td>{order.seats.length}</td>
                                    <td>{order.seats.map(seat => seat.soGhe).join(" ,")}</td>
                                    <td>
                                        {order.seats
                                            .reduce((total, seat) => total + seat.gia, 0)
                                            .toLocaleString("vn")} VND
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MovieSeatSelection