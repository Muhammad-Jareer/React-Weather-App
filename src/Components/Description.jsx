import React from 'react';

import { FaArrowUp, FaArrowDown, FaWind } from "react-icons/fa";
import { BiHappy } from 'react-icons/bi'
import { MdCompress, MdOutlineWaterDrop } from 'react-icons/md';


const Description = ({weather, units}) => {

    const tempUnit = units === 'metric' ? 'C' : 'F';
    const windunit = units === 'metric' ? 'm/s' : 'mph';

    const cards = [
        {
            id: 1,
            icon: <FaArrowDown className='size-6 sm:size-10' />,
            title: "min",
            data: weather.forecasts[0].temp_min.toFixed(),
            unit: tempUnit,
        },
        {
            id: 2,
            icon: <FaArrowUp className='size-6 sm:size-10'/>,
            title: "max",
            data: weather.forecasts[0].temp_max.toFixed(),
            unit: tempUnit,
        },
        {
            id: 3,
            icon: <BiHappy className='size-6 sm:size-10'/>,
            title: "feels like",
            data: weather.forecasts[0].feels_like.toFixed(),
            unit: tempUnit,
        },
        {
            id: 4,
            icon: <MdCompress className='size-6 sm:size-10' />,
            title: "pressure",
            data: weather.forecasts[0].pressure,
            unit: "hPa",
        },
        {
            id: 5,
            icon: <MdOutlineWaterDrop className='size-6 sm:size-10' />,
            title: "humidity",
            data: weather.forecasts[0].humidity,
            unit: "%",
        },
        {
            id: 6,
            icon: <FaWind className='size-6 sm:size-10' />,
            title: "wind",
            data: weather.forecasts[0].wind_speed.speed, 
            unit: windunit,
        },
        

    ]

    return (
        <div className="w-full py-8 grid gap-10 grid-cols-2 sm:grid-cols-3 capitalize">
            {cards.map(({id, icon, title, data, unit}) => (
                <div key={id} className="flex flex-col gap-3 items-center justify-center text-white bg-[#000000cb] rounded-lg px-4 py-2">
                    <div className="flex items-center gap-4">
                        {icon}
                        <p className='inline sm:text-3xl'>{title}</p>
                    </div>
                    <h2 className='sm:text-4xl text-2xl font-extrabold'>{`${data} ${unit}`}</h2>
                </div>
            ))}
        </div>
    );
}

export default Description;
