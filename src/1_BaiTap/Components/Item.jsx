import React from 'react'

const Item = ({ title, content, icon }) => {
    return (
        <div className="col-lg-6 col-xxl-4 mb-5">
            <div className="card bg-light border-0 h-100">
                <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                    <div
                        className="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4 d-flex align-items-center justify-content-center"
                        style={{
                            width: 64,
                            height: 64,
                            margin: "-24px auto 24px",
                            fontSize: 32
                        }}>
                        <i className={icon} />
                    </div>
                    <h2 className="fs-4 fw-bold">{title}</h2>
                    <p className="mb-0">{content}</p>
                </div>
            </div>
        </div >
    )
}

export default Item