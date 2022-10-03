import React from 'react'

const AvatarCard = ({ glassSelect }) => {
    return (
        <div className="card" style={{ width: "min(240px,100%)", margin: "0 auto" }}>
            <img className="card-img-top img-fluid" src="./image/model.jpg" alt="" />
            {glassSelect &&
                <>
                    <div
                        className="card-body position-absolute text-white"
                        style={{ bottom: "0", backgroundColor: "rgba(0,0,0,0.8)" }}
                    >
                        <h4 className="card-title" style={{ color: "#9e7bd5" }}>{glassSelect.name}</h4>
                        <h5 className='card-price' style={{ fontSize: 16 }}>{glassSelect.price}$</h5>
                        <p
                            className="card-text fs-sx"
                            style={{
                                fontSize: 14,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {glassSelect.desc}
                        </p>
                    </div>
                    <div
                        className="image position-absolute"
                        style={{ opacity: 0.85, width: "54%", top: "24%", left: "50%", transform: "translateX(-50%)" }}>
                        <img className='img-fluid' src={glassSelect.url} alt={glassSelect.name} />
                    </div>
                </>
            }
        </div >
    )
}

export default AvatarCard