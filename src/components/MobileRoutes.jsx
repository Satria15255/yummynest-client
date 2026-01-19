import React from 'react'

const MobileRoutes = ({ onClose }) => {
    return (
        <div onClick={onClose} className='h-screen z-100 inset-0 bg-black/30 fixed '>
            <div className='bg-white h-screen w-50 fixed right-0'>
                <p>Mobile Routes</p>
            </div>
        </div>
    )
}

export default MobileRoutes